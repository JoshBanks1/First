const jwt = require('jsonwebtoken');
const env = require('../config/env');

const createAccessToken = (user) => jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: env.accessTokenExpires });
const createRefreshToken = (user) => jwt.sign({ sub: user.id, tokenType: 'refresh' }, env.jwtSecret, { expiresIn: env.refreshTokenExpires });

module.exports = { createAccessToken, createRefreshToken };
