const env = require('../config/env');
const { User, Transaction } = require('../models');
const { creditWallet } = require('../services/walletService');
const { hashPostbackSignature } = require('../utils/security');

const handlePostback = async (req, res) => {
  const signature = req.headers['x-postback-signature'];
  const expected = hashPostbackSignature(req.body, env.postbackSecret);
  if (signature !== expected) return res.status(401).json({ message: 'Invalid signature' });

  const { userId, amount, referenceId } = req.body;
  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const duplicate = await Transaction.findOne({ where: { referenceId } });
  if (duplicate) return res.status(200).json({ message: 'Duplicate ignored' });

  await creditWallet(userId, amount, 'offerwall', referenceId, 'approved');
  return res.status(200).json({ message: 'Postback processed' });
};

module.exports = { handlePostback };
