const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('transactions', {
  userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
  type: { type: DataTypes.ENUM('credit', 'debit'), allowNull: false },
  amount: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
  source: { type: DataTypes.ENUM('offerwall', 'referral', 'manual', 'withdrawal'), allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'approved' },
  referenceId: { type: DataTypes.STRING, allowNull: true, field: 'reference_id' }
});

module.exports = Transaction;
