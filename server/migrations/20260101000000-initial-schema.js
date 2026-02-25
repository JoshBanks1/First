'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password_hash: { type: Sequelize.STRING, allowNull: false },
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      referral_code: { type: Sequelize.STRING, allowNull: false, unique: true },
      is_verified: { type: Sequelize.BOOLEAN, defaultValue: false },
      role: { type: Sequelize.ENUM('user', 'admin'), defaultValue: 'user' },
      status: { type: Sequelize.ENUM('active', 'suspended'), defaultValue: 'active' },
      ip_address: { type: Sequelize.STRING },
      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('wallets', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      balance: { type: Sequelize.DECIMAL(14, 2), defaultValue: 0 },
      total_earned: { type: Sequelize.DECIMAL(14, 2), defaultValue: 0 },
      total_withdrawn: { type: Sequelize.DECIMAL(14, 2), defaultValue: 0 },
      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('transactions', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      type: { type: Sequelize.ENUM('credit', 'debit'), allowNull: false },
      amount: { type: Sequelize.DECIMAL(14, 2), allowNull: false },
      source: { type: Sequelize.ENUM('offerwall', 'referral', 'manual', 'withdrawal'), allowNull: false },
      status: { type: Sequelize.ENUM('pending', 'approved', 'rejected'), defaultValue: 'approved' },
      reference_id: { type: Sequelize.STRING },
      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('withdrawals', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      amount: { type: Sequelize.DECIMAL(14, 2), allowNull: false },
      bank_name: { type: Sequelize.STRING, allowNull: false },
      account_number: { type: Sequelize.STRING, allowNull: false },
      account_name: { type: Sequelize.STRING, allowNull: false },
      status: { type: Sequelize.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
      processed_at: { type: Sequelize.DATE },
      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('referrals', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      referrer_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      referred_user_id: { type: Sequelize.INTEGER, allowNull: false, unique: true, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      bonus_awarded: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('ip_logs', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      ip_address: { type: Sequelize.STRING, allowNull: false },
      device_fingerprint: { type: Sequelize.STRING },
      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('tasks', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING, allowNull: false },
      reward_amount: { type: Sequelize.DECIMAL(14, 2), allowNull: false },
      estimated_time: { type: Sequelize.STRING, allowNull: false },
      category: { type: Sequelize.STRING, allowNull: false },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tasks');
    await queryInterface.dropTable('ip_logs');
    await queryInterface.dropTable('referrals');
    await queryInterface.dropTable('withdrawals');
    await queryInterface.dropTable('transactions');
    await queryInterface.dropTable('wallets');
    await queryInterface.dropTable('users');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_transactions_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_transactions_source";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_transactions_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_withdrawals_status";');
  }
};
