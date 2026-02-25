const { User, Wallet, Transaction, IPLog, Withdrawal, Task } = require('../models');
const { creditWallet, debitWallet } = require('../services/walletService');

const overview = async (_, res) => {
  const users = await User.findAll({ include: [{ model: Wallet, as: 'wallet' }] });
  const transactions = await Transaction.findAll({ limit: 200, order: [['createdAt', 'DESC']] });
  const fraudLogs = await IPLog.findAll({ limit: 200, order: [['createdAt', 'DESC']] });
  const pendingWithdrawals = await Withdrawal.findAll({ where: { status: 'pending' } });
  return res.json({ users, transactions, fraudLogs, pendingWithdrawals });
};

const adjustBalance = async (req, res) => {
  const { userId, amount, action } = req.body;
  if (action === 'credit') await creditWallet(userId, amount, 'manual', `admin-credit-${Date.now()}`);
  if (action === 'debit') await debitWallet(userId, amount, 'manual', `admin-debit-${Date.now()}`);
  return res.json({ message: 'Balance adjusted' });
};

const suspendUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.status = 'suspended';
  await user.save();
  return res.json({ message: 'User suspended' });
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  return res.status(201).json({ task });
};

module.exports = { overview, adjustBalance, suspendUser, createTask };
