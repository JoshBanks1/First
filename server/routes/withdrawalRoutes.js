const router = require('express').Router();
const { authRequired, adminRequired } = require('../middleware/auth');
const { createWithdrawal, listMine, approve, reject } = require('../controllers/withdrawalController');

router.post('/', authRequired, createWithdrawal);
router.get('/mine', authRequired, listMine);
router.patch('/:id/approve', authRequired, adminRequired, approve);
router.patch('/:id/reject', authRequired, adminRequired, reject);

module.exports = router;
