/**
 * Sensor Routes
 * Endpoints for sensor data management
 */

const express = require('express');
const router = express.Router();
const { SensorData, Aircraft } = require('../models');
const { Op } = require('sequelize');

/**
 * @swagger
 * /api/sensors/data:
 *   post:
 *     summary: Submit sensor data
 *     tags: [Sensors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Sensor data recorded
 */
router.post('/data', async (req, res) => {
  try {
    const sensorData = await SensorData.create(req.body);
    
    // Update aircraft health score
    await Aircraft.update(
      { health_score: req.body.health_score },
      { where: { aircraft_id: req.body.aircraft_id } }
    );
    
    // Emit real-time update via Socket.io
    const io = req.app.get('io');
    io.to(`aircraft:${req.body.aircraft_id}`).emit('sensor:update', sensorData);
    
    res.status(201).json({
      success: true,
      data: sensorData
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
 * /api/sensors/{aircraftId}:
 *   get:
 *     summary: Get sensor history for aircraft
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: aircraftId
 *         required: true
 *       - in: query
 *         name: component_type
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *     responses:
 *       200:
 *         description: Sensor data history
 */
router.get('/:aircraftId', async (req, res) => {
  try {
    const { component_type, limit = 100, startDate, endDate } = req.query;
    
    const where = { aircraft_id: req.params.aircraftId };
    if (component_type) where.component_type = component_type;
    
    if (startDate || endDate) {
      where.timestamp = {};
      if (startDate) where.timestamp[Op.gte] = new Date(startDate);
      if (endDate) where.timestamp[Op.lte] = new Date(endDate);
    }
    
    const sensorData = await SensorData.findAll({
      where,
      limit: parseInt(limit),
      order: [['timestamp', 'DESC']]
    });
    
    res.json({
      success: true,
      count: sensorData.length,
      data: sensorData
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
 * /api/sensors/{aircraftId}/latest:
 *   get:
 *     summary: Get latest sensor readings
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: aircraftId
 *         required: true
 *     responses:
 *       200:
 *         description: Latest sensor readings
 */
router.get('/:aircraftId/latest', async (req, res) => {
  try {
    const latestData = await SensorData.findAll({
      where: { aircraft_id: req.params.aircraftId },
      order: [['timestamp', 'DESC']],
      limit: 3,
      distinct: true,
      group: ['component_type']
    });
    
    res.json({
      success: true,
      data: latestData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
