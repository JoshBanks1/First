const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Wallet = sequelize.define('wallets', {
  userId: { type: DataTypes.INTEGER, allowNull: false, unique: true, field: 'user_id' },
  balance: { type: DataTypes.DECIMAL(14, 2), defaultValue: 0 },
  totalEarned: { type: DataTypes.DECIMAL(14, 2), defaultValue: 0, field: 'total_earned' },
  totalWithdrawn: { type: DataTypes.DECIMAL(14, 2), defaultValue: 0, field: 'total_withdrawn' }
});

module.exports = Wallet;
