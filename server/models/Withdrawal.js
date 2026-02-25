const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Withdrawal = sequelize.define('withdrawals', {
  userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
  amount: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
  bankName: { type: DataTypes.STRING, allowNull: false, field: 'bank_name' },
  accountNumber: { type: DataTypes.STRING, allowNull: false, field: 'account_number' },
  accountName: { type: DataTypes.STRING, allowNull: false, field: 'account_name' },
  status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
  processedAt: { type: DataTypes.DATE, field: 'processed_at' }
});

module.exports = Withdrawal;
