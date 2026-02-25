const router = require('express').Router();
const { dashboard, listTasks, completeTask, referrals } = require('../controllers/userController');
const { authRequired } = require('../middleware/auth');

router.get('/dashboard', authRequired, dashboard);
router.get('/tasks', authRequired, listTasks);
router.post('/tasks/complete', authRequired, completeTask);
router.get('/referrals', authRequired, referrals);

module.exports = router;
