const app = require('./app');
const sequelize = require('./config/database');
const env = require('./config/env');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    app.listen(env.port, () => console.log(`Server running on port ${env.port}`));
  } catch (error) {
    console.error('Startup error:', error.message);
    process.exit(1);
  }
})();
