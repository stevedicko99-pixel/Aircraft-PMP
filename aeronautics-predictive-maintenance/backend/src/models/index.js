/**
 * Models Index
 * Exports all models and defines relationships
 */

const { sequelize } = require('../config/database');
const Aircraft = require('./Aircraft');
const SensorData = require('./SensorData');
const Prediction = require('./Prediction');
const MaintenanceRecord = require('./MaintenanceRecord');
const Alert = require('./Alert');

// Define relationships

// Aircraft has many sensor data records
Aircraft.hasMany(SensorData, {
  foreignKey: 'aircraft_id',
  as: 'sensorData'
});
SensorData.belongsTo(Aircraft, {
  foreignKey: 'aircraft_id',
  as: 'aircraft'
});

// Aircraft has many predictions
Aircraft.hasMany(Prediction, {
  foreignKey: 'aircraft_id',
  as: 'predictions'
});
Prediction.belongsTo(Aircraft, {
  foreignKey: 'aircraft_id',
  as: 'aircraft'
});

// Aircraft has many maintenance records
Aircraft.hasMany(MaintenanceRecord, {
  foreignKey: 'aircraft_id',
  as: 'maintenanceRecords'
});
MaintenanceRecord.belongsTo(Aircraft, {
  foreignKey: 'aircraft_id',
  as: 'aircraft'
});

// Aircraft has many alerts
Aircraft.hasMany(Alert, {
  foreignKey: 'aircraft_id',
  as: 'alerts'
});
Alert.belongsTo(Aircraft, {
  foreignKey: 'aircraft_id',
  as: 'aircraft'
});

// Prediction has one alert
Prediction.hasOne(Alert, {
  foreignKey: 'prediction_id',
  as: 'alert'
});
Alert.belongsTo(Prediction, {
  foreignKey: 'prediction_id',
  as: 'prediction'
});

module.exports = {
  sequelize,
  Aircraft,
  SensorData,
  Prediction,
  MaintenanceRecord,
  Alert
};
