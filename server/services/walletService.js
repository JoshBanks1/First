const sequelize = require('../config/database');
const { Wallet, Transaction } = require('../models');

const creditWallet = async (userId, amount, source, referenceId = null, status = 'approved') =>
  sequelize.transaction(async (tx) => {
    const wallet = await Wallet.findOne({ where: { userId }, transaction: tx, lock: tx.LOCK.UPDATE });
    if (!wallet) throw new Error('Wallet not found');

    wallet.balance = Number(wallet.balance) + Number(amount);
    wallet.totalEarned = Number(wallet.totalEarned) + Number(amount);
    await wallet.save({ transaction: tx });

    await Transaction.create({ userId, type: 'credit', amount, source, status, referenceId }, { transaction: tx });
    return wallet;
  });

const debitWallet = async (userId, amount, source, referenceId = null, status = 'approved') =>
  sequelize.transaction(async (tx) => {
    const wallet = await Wallet.findOne({ where: { userId }, transaction: tx, lock: tx.LOCK.UPDATE });
    if (!wallet) throw new Error('Wallet not found');
    if (Number(wallet.balance) < Number(amount)) throw new Error('Insufficient balance');

    wallet.balance = Number(wallet.balance) - Number(amount);
    if (source === 'withdrawal') {
      wallet.totalWithdrawn = Number(wallet.totalWithdrawn) + Number(amount);
    }
    await wallet.save({ transaction: tx });

    await Transaction.create({ userId, type: 'debit', amount, source, status, referenceId }, { transaction: tx });
    return wallet;
  });

module.exports = { creditWallet, debitWallet };
