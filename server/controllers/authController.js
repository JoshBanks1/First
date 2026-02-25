const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const env = require('../config/env');
const { User, Wallet, IPLog, Referral } = require('../models');
const { createAccessToken, createRefreshToken } = require('../utils/tokens');
const { generateReferralCode } = require('../utils/security');

const strongPassword = (password) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);

const register = async (req, res) => {
  const { email, password, username, referralCode, recaptchaToken, deviceFingerprint } = req.body;
  const ipAddress = req.ip;

  if (!recaptchaToken) return res.status(400).json({ message: 'reCAPTCHA required (placeholder)' });
  if (!strongPassword(password)) return res.status(400).json({ message: 'Password too weak' });

  const existing = await User.findOne({ where: { [Op.or]: [{ email }, { username }] } });
  if (existing) return res.status(400).json({ message: 'Email or username already exists' });

  const ipCount = await User.count({ where: { ipAddress } });
  if (ipCount >= env.maxAccountsPerIp) return res.status(403).json({ message: 'Too many accounts from this IP' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, username, passwordHash, ipAddress, referralCode: generateReferralCode(username) });
  await Wallet.create({ userId: user.id });
  await IPLog.create({ userId: user.id, ipAddress, deviceFingerprint: deviceFingerprint || null });

  if (referralCode) {
    const referrer = await User.findOne({ where: { [Op.or]: [{ username: referralCode }, { referralCode }] } });
    if (referrer) await Referral.create({ referrerId: referrer.id, referredUserId: user.id });
  }

  return res.status(201).json({
    user: { id: user.id, email: user.email, username: user.username, role: user.role },
    accessToken: createAccessToken(user),
    refreshToken: createRefreshToken(user)
  });
};

const login = async (req, res) => {
  const { email, password, deviceFingerprint } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  if (user.status === 'suspended') return res.status(403).json({ message: 'Account suspended' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  await IPLog.create({ userId: user.id, ipAddress: req.ip, deviceFingerprint: deviceFingerprint || null });

  return res.json({
    user: { id: user.id, email: user.email, username: user.username, role: user.role },
    accessToken: createAccessToken(user),
    refreshToken: createRefreshToken(user)
  });
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });
  try {
    const decoded = jwt.verify(refreshToken, env.jwtSecret);
    if (decoded.tokenType !== 'refresh') return res.status(401).json({ message: 'Invalid refresh token' });
    const user = await User.findByPk(decoded.sub);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ accessToken: createAccessToken(user) });
  } catch {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

module.exports = { register, login, refresh };
