const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: Number(process.env.PORT || 4000),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || 'development-secret',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  postbackSecret: process.env.POSTBACK_SECRET || 'postback-secret',
  paystackSecret: process.env.PAYSTACK_SECRET || 'paystack-secret',
  accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES || '15m',
  refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES || '7d',
  minWithdrawal: Number(process.env.MIN_WITHDRAWAL || 5000),
  maxAccountsPerIp: Number(process.env.MAX_ACCOUNTS_PER_IP || 3),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};
