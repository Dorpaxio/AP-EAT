const router = require('express').Router();
const cartsController = require('../../controllers/CartsController');
const isAdmin = require('../../middlewares/AdminMiddleware');

router.route('/')
    .get(isAdmin, cartsController.getCarts);

router.param('cartId', cartsController.cartParamMiddleware);
router.route('/:cartId')
    .get(isAdmin, cartsController.getCart);


module.exports = router;
