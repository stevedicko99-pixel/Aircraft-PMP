/**
 * Aircraft Routes
 * Endpoints for aircraft management
 */

const express = require('express');
const router = express.Router();
const { Aircraft, SensorData, Prediction, Alert } = require('../models');
const { Op } = require('sequelize');

/**
 * @swagger
 * /api/aircraft:
 *   get:
 *     summary: Get all aircraft
 *     tags: [Aircraft]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, maintenance, grounded, retired]
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *     responses:
 *       200:
 *         description: List of aircraft
 */
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;
    
    const where = {};
    if (status) where.status = status;
    
    const aircraft = await Aircraft.findAll({
      where,
      limit: parseInt(limit),
      order: [['health_score', 'ASC']]
    });
    
    res.json({
      success: true,
      count: aircraft.length,
      data: aircraft
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @swagger
 * /api/aircraft/{id}:
 *   get:
 *     summary: Get aircraft by ID
 *     tags: [Aircraft]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aircraft details
 *       404:
 *         description: Aircraft not found
 */
router.get('/:id', async (req, res) => {
  try {
    const aircraft = await Aircraft.findOne({
      where: { aircraft_id: req.params.id },
      include: [
        {
          model: SensorData,
          as: 'sensorData',
          limit: 10,
          order: [['timestamp', 'DESC']]
        },
        {
          model: Prediction,
          as: 'predictions',
          limit: 5,
          order: [['timestamp', 'DESC']]
        },
        {
          model: Alert,
          as: 'alerts',
          where: { status: 'active' },
          required: false
        }
      ]
    });
    
    if (!aircraft) {
      return res.status(404).json({
        success: false,
        error: 'Aircraft not found'
      });
    }
    
    res.json({
      success: true,
      data: aircraft
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @swagger
 * /api/aircraft/{id}/health:
 *   get:
 *     summary: Get aircraft health status
 *     tags: [Aircraft]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aircraft health status
 */
router.get('/:id/health', async (req, res) => {
  try {
    const aircraft = await Aircraft.findOne({
      where: { aircraft_id: req.params.id }
    });
    
    if (!aircraft) {
      return res.status(404).json({
        success: false,
        error: 'Aircraft not found'
      });
    }
    
    // Get latest sensor data for each component
    const latestSensorData = await SensorData.findAll({
      where: { aircraft_id: req.params.id },
      attributes: [
        'component_type',
        [require('sequelize').fn('MAX', require('sequelize').col('timestamp')), 'latest_timestamp']
      ],
      group: ['component_type'],
      raw: true
    });
    
    const componentHealth = await Promise.all(
      latestSensorData.map(async (component) => {
        const data = await SensorData.findOne({
          where: {
            aircraft_id: req.params.id,
            component_type: component.component_type,
            timestamp: component.latest_timestamp
          }
        });
        
        return {
          component_type: component.component_type,
          health_score: data.health_score,
          vibration_level: data.vibration_level,
          temperature: data.temperature,
          wear_level: data.wear_level,
          last_updated: data.timestamp
        };
      })
    );
    
    // Get active alerts
    const activeAlerts = await Alert.count({
      where: {
        aircraft_id: req.params.id,
        status: 'active'
      }
    });
    
    // Get critical predictions
    const criticalPredictions = await Prediction.count({
      where: {
        aircraft_id: req.params.id,
        alert_level: 'critical',
        timestamp: {
          [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      }
    });
    
    res.json({
      success: true,
      data: {
        aircraft_id: aircraft.aircraft_id,
        overall_health_score: aircraft.health_score,
        status: aircraft.status,
        component_health: componentHealth,
        active_alerts: activeAlerts,
        critical_predictions: criticalPredictions,
        total_flight_hours: aircraft.total_flight_hours,
        total_cycles: aircraft.total_cycles,
        last_maintenance: aircraft.last_maintenance_date,
        next_maintenance: aircraft.next_scheduled_maintenance
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @swagger
 * /api/aircraft:
 *   post:
 *     summary: Create new aircraft
 *     tags: [Aircraft]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - aircraft_id
 *               - model
 *               - manufacturer
 *     responses:
 *       201:
 *         description: Aircraft created
 */
router.post('/', async (req, res) => {
  try {
    const aircraft = await Aircraft.create(req.body);
    
    res.status(201).json({
      success: true,
      data: aircraft
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @swagger
 * /api/aircraft/{id}:
 *   put:
 *     summary: Update aircraft
 *     tags: [Aircraft]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aircraft updated
 */
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Aircraft.update(req.body, {
      where: { aircraft_id: req.params.id }
    });
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: 'Aircraft not found'
      });
    }
    
    const aircraft = await Aircraft.findOne({
      where: { aircraft_id: req.params.id }
    });
    
    res.json({
      success: true,
      data: aircraft
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
