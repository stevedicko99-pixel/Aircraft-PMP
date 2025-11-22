/**
 * Maintenance Routes
 * Endpoints for maintenance management
 */

const express = require('express');
const router = express.Router();
const { MaintenanceRecord, Aircraft } = require('../models');

router.get('/', async (req, res) => {
  try {
    const { status, aircraft_id, limit = 50 } = req.query;
    const where = {};
    if (status) where.status = status;
    if (aircraft_id) where.aircraft_id = aircraft_id;
    
    const records = await MaintenanceRecord.findAll({
      where,
      limit: parseInt(limit),
      order: [['maintenance_date', 'DESC']],
      include: [{ model: Aircraft, as: 'aircraft', attributes: ['aircraft_id', 'model'] }]
    });
    
    res.json({ success: true, count: records.length, data: records });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const record = await MaintenanceRecord.create(req.body);
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updated] = await MaintenanceRecord.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Record not found' });
    }
    
    const record = await MaintenanceRecord.findByPk(req.params.id);
    res.json({ success: true, data: record });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
