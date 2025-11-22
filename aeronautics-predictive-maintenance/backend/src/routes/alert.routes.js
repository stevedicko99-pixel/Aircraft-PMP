/**
 * Alert Routes
 * Endpoints for alert management
 */

const express = require('express');
const router = express.Router();
const { Alert, Aircraft, Prediction } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const { status = 'active', alert_level, limit = 50 } = req.query;
    const where = {};
    if (status) where.status = status;
    if (alert_level) where.alert_level = alert_level;
    
    const alerts = await Alert.findAll({
      where,
      limit: parseInt(limit),
      order: [['priority', 'ASC'], ['created_at', 'DESC']],
      include: [
        { model: Aircraft, as: 'aircraft', attributes: ['aircraft_id', 'model', 'status'] },
        { model: Prediction, as: 'prediction' }
      ]
    });
    
    res.json({ success: true, count: alerts.length, data: alerts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/critical', async (req, res) => {
  try {
    const alerts = await Alert.findAll({
      where: { alert_level: 'critical', status: 'active' },
      order: [['created_at', 'DESC']],
      include: [{ model: Aircraft, as: 'aircraft' }]
    });
    
    res.json({ success: true, count: alerts.length, data: alerts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/:id/acknowledge', async (req, res) => {
  try {
    const { acknowledged_by } = req.body;
    
    const [updated] = await Alert.update(
      {
        status: 'acknowledged',
        acknowledged_by,
        acknowledged_at: new Date()
      },
      { where: { id: req.params.id } }
    );
    
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Alert not found' });
    }
    
    const alert = await Alert.findByPk(req.params.id);
    
    // Emit update via Socket.io
    const io = req.app.get('io');
    io.emit('alert:acknowledged', alert);
    
    res.json({ success: true, data: alert });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.put('/:id/resolve', async (req, res) => {
  try {
    const [updated] = await Alert.update(
      { status: 'resolved', resolved_at: new Date() },
      { where: { id: req.params.id } }
    );
    
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Alert not found' });
    }
    
    const alert = await Alert.findByPk(req.params.id);
    res.json({ success: true, data: alert });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
