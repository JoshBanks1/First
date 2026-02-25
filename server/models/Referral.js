const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Referral = sequelize.define('referrals', {
  referrerId: { type: DataTypes.INTEGER, allowNull: false, field: 'referrer_id' },
  referredUserId: { type: DataTypes.INTEGER, allowNull: false, unique: true, field: 'referred_user_id' },
  bonusAwarded: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'bonus_awarded' }
});

module.exports = Referral;
