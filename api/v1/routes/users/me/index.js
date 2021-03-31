const router = require('express').Router();
const authController = require('../../../controllers/AuthController');
const cartsController = require('../../../controllers/CartsController');

router.route('/')
    .get(authController.getCurrentUser);

router.route('/cart')
    .get(cartsController.getClientCart);


module.exports = router;
