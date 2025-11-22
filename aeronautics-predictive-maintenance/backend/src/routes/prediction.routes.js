/**
 * Prediction Routes
 * Endpoints for ML predictions
 */

const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Prediction, Alert, Aircraft } = require('../models');
const { Op } = require('sequelize');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

/**
 * @swagger
 * /api/predictions/analyze:
 *   post:
 *     summary: Analyze sensor data and get prediction
 *     tags: [Predictions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Prediction result
 */
router.post('/analyze', async (req, res) => {
  try {
    // Call ML service
    const mlResponse = await axios.post(`${ML_SERVICE_URL}/api/predict`, req.body);
    const predictionData = mlResponse.data.data;
    
    // Save prediction to database
    const prediction = await Prediction.create({
      aircraft_id: predictionData.aircraft_id,
      component_type: predictionData.component_type,
      prediction: predictionData.prediction,
      confidence: predictionData.confidence,
      alert_level: predictionData.alert_level,
      days_to_failure: predictionData.days_to_failure,
      health_score: predictionData.health_score,
      risk_score: predictionData.risk_score,
      risk_factors: predictionData.top_risk_factors,
      recommendation: predictionData.recommendation
    });
    
    // Create alert if failure predicted
    if (predictionData.prediction === 'failure' && predictionData.alert_level !== 'none') {
      const alert = await Alert.create({
        aircraft_id: predictionData.aircraft_id,
        prediction_id: prediction.id,
        component_type: predictionData.component_type,
        alert_level: predictionData.alert_level,
        title: `${predictionData.alert_level.toUpperCase()}: Potential ${predictionData.component_type} failure`,
        message: `Predicted failure within ${predictionData.days_to_failure} days with ${predictionData.confidence}% confidence`,
        recommendation: predictionData.recommendation,
        days_to_failure: predictionData.days_to_failure,
        confidence: predictionData.confidence,
        priority: predictionData.alert_level === 'critical' ? 1 : predictionData.alert_level === 'high' ? 2 : 3
      });
      
      // Emit real-time alert via Socket.io
      const io = req.app.get('io');
      io.to(`aircraft:${predictionData.aircraft_id}`).emit('alert:new', alert);
      io.emit('prediction:update', { aircraft_id: predictionData.aircraft_id, prediction: predictionData });
    }
    
    res.json({
      success: true,
      data: {
        prediction,
        ml_analysis: predictionData
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
 * /api/predictions:
 *   get:
 *     summary: Get all predictions
 *     tags: [Predictions]
 *     parameters:
 *       - in: query
 *         name: alert_level
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *     responses:
 *       200:
 *         description: List of predictions
 */
router.get('/', async (req, res) => {
  try {
    const { alert_level, aircraft_id, limit = 50 } = req.query;
    
    const where = {};
    if (alert_level) where.alert_level = alert_level;
    if (aircraft_id) where.aircraft_id = aircraft_id;
    
    const predictions = await Prediction.findAll({
      where,
      limit: parseInt(limit),
      order: [['timestamp', 'DESC']],
      include: [
        {
          model: Aircraft,
          as: 'aircraft',
          attributes: ['aircraft_id', 'model', 'status']
        }
      ]
    });
    
    res.json({
      success: true,
      count: predictions.length,
      data: predictions
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
 * /api/predictions/{aircraftId}:
 *   get:
 *     summary: Get predictions for specific aircraft
 *     tags: [Predictions]
 *     parameters:
 *       - in: path
 *         name: aircraftId
 *         required: true
 *     responses:
 *       200:
 *         description: Aircraft predictions
 */
router.get('/:aircraftId', async (req, res) => {
  try {
    const predictions = await Prediction.findAll({
      where: { aircraft_id: req.params.aircraftId },
      order: [['timestamp', 'DESC']],
      limit: 20
    });
    
    res.json({
      success: true,
      count: predictions.length,
      data: predictions
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
 * /api/predictions/stats/summary:
 *   get:
 *     summary: Get prediction statistics
 *     tags: [Predictions]
 *     responses:
 *       200:
 *         description: Prediction statistics
 */
router.get('/stats/summary', async (req, res) => {
  try {
    const totalPredictions = await Prediction.count();
    
    const failurePredictions = await Prediction.count({
      where: { prediction: 'failure' }
    });
    
    const criticalAlerts = await Prediction.count({
      where: { alert_level: 'critical' }
    });
    
    const highAlerts = await Prediction.count({
      where: { alert_level: 'high' }
    });
    
    const recentPredictions = await Prediction.count({
      where: {
        timestamp: {
          [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      }
    });
    
    const avgConfidence = await Prediction.findOne({
      attributes: [
        [require('sequelize').fn('AVG', require('sequelize').col('confidence')), 'avg_confidence']
      ],
      raw: true
    });
    
    res.json({
      success: true,
      data: {
        total_predictions: totalPredictions,
        failure_predictions: failurePredictions,
        critical_alerts: criticalAlerts,
        high_alerts: highAlerts,
        recent_predictions_24h: recentPredictions,
        average_confidence: parseFloat(avgConfidence.avg_confidence || 0).toFixed(2)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
