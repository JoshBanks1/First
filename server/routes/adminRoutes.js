const router = require('express').Router();
const { authRequired, adminRequired } = require('../middleware/auth');
const { overview, adjustBalance, suspendUser, createTask } = require('../controllers/adminController');

router.use(authRequired, adminRequired);
router.get('/overview', overview);
router.post('/adjust-balance', adjustBalance);
router.patch('/users/:id/suspend', suspendUser);
router.post('/tasks', createTask);

module.exports = router;
