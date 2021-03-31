const router = require('express').Router();
const isLogged = require('../controllers/AuthController').checkToken;

router.use('/auth', require('./auth'));
router.use('/restaurants', isLogged, require('./restaurants'));
router.use('/users', isLogged, require('./users'));

module.exports = router;
