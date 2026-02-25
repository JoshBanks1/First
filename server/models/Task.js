const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('tasks', {
  title: { type: DataTypes.STRING, allowNull: false },
  rewardAmount: { type: DataTypes.DECIMAL(14, 2), allowNull: false, field: 'reward_amount' },
  estimatedTime: { type: DataTypes.STRING, allowNull: false, field: 'estimated_time' },
  category: { type: DataTypes.STRING, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' }
});

module.exports = Task;
