/**
 * Report Routes
 * Endpoints for report generation
 */

const express = require('express');
const router = express.Router();
const { Aircraft, SensorData, Prediction, Alert, MaintenanceRecord } = require('../models');
const { Op } = require('sequelize');

router.get('/export', async (req, res) => {
  try {
    const { aircraft_id, start_date, end_date } = req.query;
    
    const dateFilter = {};
    if (start_date) dateFilter[Op.gte] = new Date(start_date);
    if (end_date) dateFilter[Op.lte] = new Date(end_date);
    
    const aircraft = await Aircraft.findOne({
      where: { aircraft_id }
    });
    
    if (!aircraft) {
      return res.status(404).json({ success: false, error: 'Aircraft not found' });
    }
    
    const predictions = await Prediction.findAll({
      where: {
        aircraft_id,
        ...(Object.keys(dateFilter).length && { timestamp: dateFilter })
      },
      order: [['timestamp', 'DESC']]
    });
    
    const alerts = await Alert.findAll({
      where: {
        aircraft_id,
        ...(Object.keys(dateFilter).length && { created_at: dateFilter })
      },
      order: [['created_at', 'DESC']]
    });
    
    const maintenance = await MaintenanceRecord.findAll({
      where: {
        aircraft_id,
        ...(Object.keys(dateFilter).length && { maintenance_date: dateFilter })
      },
      order: [['maintenance_date', 'DESC']]
    });
    
    const report = {
      generated_at: new Date().toISOString(),
      aircraft: {
        aircraft_id: aircraft.aircraft_id,
        model: aircraft.model,
        manufacturer: aircraft.manufacturer,
        status: aircraft.status,
        health_score: aircraft.health_score,
        total_flight_hours: aircraft.total_flight_hours
      },
      summary: {
        total_predictions: predictions.length,
        failure_predictions: predictions.filter(p => p.prediction === 'failure').length,
        critical_alerts: alerts.filter(a => a.alert_level === 'critical').length,
        total_maintenance: maintenance.length,
        total_maintenance_cost: maintenance.reduce((sum, m) => sum + (m.cost_usd || 0), 0)
      },
      predictions: predictions.slice(0, 20),
      alerts: alerts.slice(0, 20),
      maintenance_history: maintenance.slice(0, 10)
    };
    
    res.json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/economic-impact', async (req, res) => {
  try {
    const { aircraft_id } = req.query;
    
    const where = aircraft_id ? { aircraft_id } : {};
    
    const predictions = await Prediction.findAll({
      where: {
        ...where,
        prediction: 'failure',
        timestamp: {
          [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    });
    
    const maintenance = await MaintenanceRecord.findAll({
      where: {
        ...where,
        maintenance_date: {
          [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    });
    
    const proactiveCost = maintenance
      .filter(m => m.maintenance_type === 'preventive_maintenance')
      .reduce((sum, m) => sum + (m.cost_usd || 0) + (m.downtime_hours || 0) * 25000, 0);
    
    const reactiveCost = maintenance
      .filter(m => m.maintenance_type !== 'preventive_maintenance')
      .reduce((sum, m) => sum + (m.cost_usd || 0) + (m.downtime_hours || 0) * 25000, 0);
    
    const potentialSavings = predictions.length * 150000;
    const actualSavings = reactiveCost > 0 ? reactiveCost - proactiveCost : 0;
    
    res.json({
      success: true,
      data: {
        period: 'Last 30 days',
        proactive_maintenance_cost: Math.round(proactiveCost),
        reactive_maintenance_cost: Math.round(reactiveCost),
        potential_savings: Math.round(potentialSavings),
        actual_savings: Math.round(actualSavings),
        roi_percentage: proactiveCost > 0 ? Math.round((actualSavings / proactiveCost) * 100) : 0,
        failures_prevented: predictions.length,
        cost_per_failure_prevented: predictions.length > 0 ? Math.round(proactiveCost / predictions.length) : 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
