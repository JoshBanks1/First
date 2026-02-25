const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('users', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
  passwordHash: { type: DataTypes.STRING, allowNull: false, field: 'password_hash' },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  referralCode: { type: DataTypes.STRING, unique: true, allowNull: false, field: 'referral_code' },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_verified' },
  role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
  status: { type: DataTypes.ENUM('active', 'suspended'), defaultValue: 'active' },
  ipAddress: { type: DataTypes.STRING, field: 'ip_address' }
});

module.exports = User;
