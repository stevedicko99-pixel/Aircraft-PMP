/**
 * Alert Model
 * Stores system alerts for maintenance actions
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Alert = sequelize.define('alert', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  aircraft_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    references: {
      model: 'aircraft',
      key: 'aircraft_id'
    }
  },
  prediction_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'prediction',
      key: 'id'
    }
  },
  component_type: {
    type: DataTypes.ENUM('engine', 'landing_gear', 'hydraulic_system'),
    allowNull: false
  },
  alert_level: {
    type: DataTypes.ENUM('medium', 'high', 'critical'),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  recommendation: {
    type: DataTypes.TEXT
  },
  days_to_failure: {
    type: DataTypes.INTEGER
  },
  confidence: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 100
    }
  },
  status: {
    type: DataTypes.ENUM('active', 'acknowledged', 'resolved', 'dismissed'),
    defaultValue: 'active'
  },
  acknowledged_by: {
    type: DataTypes.STRING(100)
  },
  acknowledged_at: {
    type: DataTypes.DATE
  },
  resolved_at: {
    type: DataTypes.DATE
  },
  priority: {
    type: DataTypes.INTEGER,
    defaultValue: 3,
    validate: {
      min: 1,
      max: 5
    }
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  indexes: [
    { fields: ['aircraft_id'] },
    { fields: ['alert_level'] },
    { fields: ['status'] },
    { fields: ['created_at'] }
  ]
});

module.exports = Alert;
