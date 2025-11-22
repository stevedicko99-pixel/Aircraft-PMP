/**
 * SensorData Model
 * Stores sensor readings from aircraft components
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SensorData = sequelize.define('sensor_data', {
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
  vibration_level: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  pressure: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  wear_level: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  oil_quality: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  rpm: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  fuel_flow: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  health_score: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  },
  operating_hours: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  cycles: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  indexes: [
    { fields: ['aircraft_id'] },
    { fields: ['component_type'] },
    { fields: ['timestamp'] },
    { fields: ['health_score'] }
  ]
});

module.exports = SensorData;
