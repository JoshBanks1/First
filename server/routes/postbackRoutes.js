const router = require('express').Router();
const { handlePostback } = require('../controllers/postbackController');

router.post('/', handlePostback);

module.exports = router;
