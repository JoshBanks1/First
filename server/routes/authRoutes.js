const router = require('express').Router();
const { register, login, refresh } = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimit');

router.post('/register', register);
router.post('/login', authLimiter, login);
router.post('/refresh', refresh);

module.exports = router;
