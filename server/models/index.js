const User = require('./User');
const Wallet = require('./Wallet');
const Transaction = require('./Transaction');
const Withdrawal = require('./Withdrawal');
const Referral = require('./Referral');
const IPLog = require('./IPLog');
const Task = require('./Task');

User.hasOne(Wallet, { foreignKey: 'user_id', as: 'wallet' });
Wallet.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Transaction, { foreignKey: 'user_id', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Withdrawal, { foreignKey: 'user_id', as: 'withdrawals' });
Withdrawal.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(IPLog, { foreignKey: 'user_id', as: 'ipLogs' });
IPLog.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Referral, { foreignKey: 'referrer_id', as: 'referredUsers' });
Referral.belongsTo(User, { foreignKey: 'referrer_id', as: 'referrer' });

module.exports = { User, Wallet, Transaction, Withdrawal, Referral, IPLog, Task };
