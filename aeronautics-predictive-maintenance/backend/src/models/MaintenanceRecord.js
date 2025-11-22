/**
 * MaintenanceRecord Model
 * Stores maintenance history
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MaintenanceRecord = sequelize.define('maintenance_record', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  maintenance_id: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  aircraft_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    references: {
      model: 'aircraft',
      key: 'aircraft_id'
    }
  },
  component_type: {
    type: DataTypes.ENUM('engine', 'landing_gear', 'hydraulic_system', 'other'),
    allowNull: false
  },
  maintenance_type: {
    type: DataTypes.ENUM(
      'scheduled_inspection',
      'component_replacement',
      'repair',
      'overhaul',
      'preventive_maintenance'
    ),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  maintenance_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  completion_date: {
    type: DataTypes.DATE
  },
  cost_usd: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0
    }
  },
  downtime_hours: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0
    }
  },
  technician_id: {
    type: DataTypes.STRING(50)
  },
  parts_replaced: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  severity: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
    defaultValue: 'medium'
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'in_progress', 'completed', 'cancelled'),
    defaultValue: 'scheduled'
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  indexes: [
    { fields: ['aircraft_id'] },
    { fields: ['maintenance_type'] },
    { fields: ['maintenance_date'] },
    { fields: ['status'] }
  ]
});

module.exports = MaintenanceRecord;
