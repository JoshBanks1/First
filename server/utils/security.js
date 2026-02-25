const crypto = require('crypto');

const hashPostbackSignature = (payload, secret) =>
  crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex');

const generateReferralCode = (username) => `${username.toUpperCase()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

module.exports = { hashPostbackSignature, generateReferralCode };
