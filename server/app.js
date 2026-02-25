const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const env = require('./config/env');

const app = express();
app.set('trust proxy', true);
app.use(helmet());
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/withdrawals', require('./routes/withdrawalRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/postback', require('./routes/postbackRoutes'));

app.use((err, _, res, __) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
