const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const IPLog = sequelize.define('ip_logs', {
  userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
  ipAddress: { type: DataTypes.STRING, allowNull: false, field: 'ip_address' },
  deviceFingerprint: { type: DataTypes.STRING, field: 'device_fingerprint' }
});

module.exports = IPLog;
