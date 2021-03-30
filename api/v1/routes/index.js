const router = require('express').Router();
const authController = require('../controllers/AuthController');

router.use('/auth', require('./auth'));

module.exports = router;
