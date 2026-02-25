const Redis = require('ioredis');
const env = require('../config/env');

let redisClient;

const getRedisClient = () => {
  if (!redisClient) {
    redisClient = new Redis(env.redisUrl, { lazyConnect: true, maxRetriesPerRequest: 1 });
    redisClient.connect().catch(() => {
      redisClient = null;
    });
  }
  return redisClient;
};

module.exports = { getRedisClient };
