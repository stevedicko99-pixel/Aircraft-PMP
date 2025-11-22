/**
 * Aircraft Model
 * Represents aircraft in the fleet
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Aircraft = sequelize.define('aircraft', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  aircraft_id: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  model: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  manufacturer: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  year_manufactured: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1900,
      max: new Date().getFullYear()
    }
  },
  total_flight_hours: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  total_cycles: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  status: {
    type: DataTypes.ENUM('active', 'maintenance', 'grounded', 'retired'),
    defaultValue: 'active'
  },
  last_maintenance_date: {
    type: DataTypes.DATE
  },
  next_scheduled_maintenance: {
    type: DataTypes.DATE
  },
  health_score: {
    type: DataTypes.FLOAT,
    defaultValue: 100,
    validate: {
      min: 0,
      max: 100
    }
  },
  location: {
    type: DataTypes.STRING(100)
  },
  operator: {
    type: DataTypes.STRING(100)
  }
}, {
  indexes: [
    { fields: ['aircraft_id'] },
    { fields: ['status'] },
    { fields: ['health_score'] }
  ]
});

module.exports = Aircraft;
