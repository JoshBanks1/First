const { Withdrawal } = require('../models');
const env = require('../config/env');
const { debitWallet } = require('../services/walletService');

const createWithdrawal = async (req, res) => {
  const { amount, bankName, accountNumber, accountName } = req.body;
  if (Number(amount) < env.minWithdrawal) {
    return res.status(400).json({ message: `Minimum withdrawal is ${env.minWithdrawal}` });
  }
  const withdrawal = await Withdrawal.create({ userId: req.user.sub, amount, bankName, accountNumber, accountName, status: 'pending' });
  return res.status(201).json({ withdrawal, message: 'Withdrawal request submitted' });
};

const listMine = async (req, res) => {
  const withdrawals = await Withdrawal.findAll({ where: { userId: req.user.sub } });
  return res.json({ withdrawals });
};

const approve = async (req, res) => {
  const { id } = req.params;
  const withdrawal = await Withdrawal.findByPk(id);
  if (!withdrawal || withdrawal.status !== 'pending') return res.status(404).json({ message: 'Pending withdrawal not found' });

  await debitWallet(withdrawal.userId, withdrawal.amount, 'withdrawal', `withdraw-${withdrawal.id}`);
  withdrawal.status = 'approved';
  withdrawal.processedAt = new Date();
  await withdrawal.save();

  return res.json({ message: 'Withdrawal approved (Paystack placeholder)', withdrawal });
};

const reject = async (req, res) => {
  const { id } = req.params;
  const withdrawal = await Withdrawal.findByPk(id);
  if (!withdrawal || withdrawal.status !== 'pending') return res.status(404).json({ message: 'Pending withdrawal not found' });
  withdrawal.status = 'rejected';
  withdrawal.processedAt = new Date();
  await withdrawal.save();
  return res.json({ message: 'Withdrawal rejected', withdrawal });
};

module.exports = { createWithdrawal, listMine, approve, reject };
