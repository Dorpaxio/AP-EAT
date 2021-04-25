const router = require('express').Router();
const isLogged = require('../controllers/AuthController').checkToken;

router.use('/auth', require('./auth'));
router.use('/carts', isLogged, require('./carts'));
router.use('/products', isLogged, require('./products'));
router.use('/menus', isLogged, require('./menus'));
router.use('/orders', isLogged, require('./orders'));
router.use('/restaurants', isLogged, require('./restaurants'));
router.use('/users', isLogged, require('./users'));

router.use(require('../errors/ErrorHandler'));

module.exports = router;
