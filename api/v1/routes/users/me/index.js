const router = require('express').Router();
const authController = require('../../../controllers/AuthController');
const cartsController = require('../../../controllers/CartsController');
const {body} = require('express-validator');
const validation = require('../../../../../lib/ValidationHandlerMiddleware');

router.route('/')
    .get(authController.getCurrentUser);

router.route('/cart')
    .get(cartsController.getClientCart)
    .post(body('restaurant').isMongoId(),
        body('menu').isMongoId(),
        validation,
        cartsController.addInCart);


module.exports = router;
