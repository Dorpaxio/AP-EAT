const router = require('express').Router();
const isAdmin = require('../middlewares/AdminMiddleware');
const authController = require('../controllers/AuthController');
const usersController = require('../controllers/UsersController');
const cartsController = require('../controllers/CartsController');
const {body} = require('express-validator');
const validation = require('../../../lib/ValidationHandlerMiddleware');

router.route('/')
    .get(isAdmin, usersController.getUsers);

router.route('/me')
    .get(authController.getCurrentUser);

router.route('/me/cart')
    .get(cartsController.getClientCart)
    .post(body('restaurant').isMongoId(),
        body('menu').isMongoId(),
        validation,
        cartsController.addInCart)
    .delete(cartsController.deleteCart);

module.exports = router;
