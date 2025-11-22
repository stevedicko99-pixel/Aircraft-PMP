/**
 * Prediction Model
 * Stores ML predictions for component failures
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Prediction = sequelize.define('prediction', {
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
  component_type: {
    type: DataTypes.ENUM('engine', 'landing_gear', 'hydraulic_system'),
    allowNull: false
  },
  prediction: {
    type: DataTypes.ENUM('failure', 'no_failure'),
    allowNull: false
  },
  confidence: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  },
  alert_level: {
    type: DataTypes.ENUM('none', 'medium', 'high', 'critical'),
    defaultValue: 'none'
  },
  days_to_failure: {
    type: DataTypes.INTEGER
  },
  health_score: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 100
    }
  },
  risk_score: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 100
    }
  },
  risk_factors: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  recommendation: {
    type: DataTypes.TEXT
  },
  sensor_data_id: {
    type: DataTypes.INTEGER
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  indexes: [
    { fields: ['aircraft_id'] },
    { fields: ['component_type'] },
    { fields: ['alert_level'] },
    { fields: ['timestamp'] }
  ]
});

module.exports = Prediction;
