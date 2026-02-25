const { Wallet, Referral, Transaction, Task, User } = require('../models');
const { creditWallet } = require('../services/walletService');

const dashboard = async (req, res) => {
  const userId = req.user.sub;
  const wallet = await Wallet.findOne({ where: { userId } });
  const referralCount = await Referral.count({ where: { referrerId: userId } });
  const pendingEarnings = await Transaction.sum('amount', { where: { userId, type: 'credit', status: 'pending' } }) || 0;
  return res.json({ wallet, pendingEarnings: Number(pendingEarnings), referralCount });
};

const listTasks = async (_, res) => {
  const tasks = await Task.findAll({ where: { isActive: true } });
  return res.json({ tasks });
};

const completeTask = async (req, res) => {
  const userId = req.user.sub;
  const { taskId } = req.body;
  const task = await Task.findByPk(taskId);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  await creditWallet(userId, task.rewardAmount, 'offerwall', `task-${task.id}-${Date.now()}`);

  const referral = await Referral.findOne({ where: { referredUserId: userId, bonusAwarded: false } });
  if (referral) {
    await creditWallet(referral.referrerId, 100, 'referral', `ref-bonus-${userId}`);
    referral.bonusAwarded = true;
    await referral.save();
  }

  return res.json({ message: 'Task reward credited' });
};

const referrals = async (req, res) => {
  const user = await User.findByPk(req.user.sub);
  const referralsList = await Referral.findAll({ where: { referrerId: req.user.sub } });
  return res.json({
    referralLink: `https://stripecore.com/register?ref=${user.username}`,
    totalReferrals: referralsList.length,
    referrals: referralsList
  });
};

module.exports = { dashboard, listTasks, completeTask, referrals };
