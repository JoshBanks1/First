'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const adminPassword = await bcrypt.hash('Admin123!', 10);
    const users = [
      { email: 'admin@stripecore.com', username: 'admin', role: 'admin', password_hash: adminPassword, referral_code: 'ADMIN-CORE', ip_address: '127.0.0.1', is_verified: true, status: 'active', created_at: now, updated_at: now },
      ...Array.from({ length: 5 }).map((_, idx) => ({
        email: `user${idx + 1}@stripecore.com`,
        username: `user${idx + 1}`,
        role: 'user',
        password_hash: adminPassword,
        referral_code: `USER${idx + 1}-REF`,
        ip_address: `127.0.0.${idx + 2}`,
        is_verified: true,
        status: 'active',
        created_at: now,
        updated_at: now
      }))
    ];

    await queryInterface.bulkInsert('users', users);
    const insertedUsers = await queryInterface.sequelize.query('SELECT id FROM users ORDER BY id ASC;', { type: queryInterface.sequelize.QueryTypes.SELECT });

    await queryInterface.bulkInsert('wallets', insertedUsers.map((u) => ({
      user_id: u.id,
      balance: 2000,
      total_earned: 5000,
      total_withdrawn: 3000,
      created_at: now,
      updated_at: now
    })));

    const transactions = [];
    insertedUsers.forEach((u) => {
      for (let i = 0; i < 3; i += 1) {
        transactions.push({
          user_id: u.id,
          type: i === 2 ? 'debit' : 'credit',
          amount: i === 2 ? 1000 : 3000,
          source: i === 0 ? 'offerwall' : i === 1 ? 'manual' : 'withdrawal',
          status: 'approved',
          reference_id: `seed-${u.id}-${i}`,
          created_at: now,
          updated_at: now
        });
      }
    });
    await queryInterface.bulkInsert('transactions', transactions);

    await queryInterface.bulkInsert('tasks', Array.from({ length: 10 }).map((_, idx) => ({
      title: `Mock Task ${idx + 1}`,
      reward_amount: 250 + idx * 50,
      estimated_time: `${5 + idx} min`,
      category: idx % 2 ? 'Survey' : 'App Install',
      is_active: true,
      created_at: now,
      updated_at: now
    })));
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tasks', null, {});
    await queryInterface.bulkDelete('transactions', null, {});
    await queryInterface.bulkDelete('wallets', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
