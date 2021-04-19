const router = require('express').Router();
const productsController = require('../../controllers/ProductsController');
const isAdmin = require('../../middlewares/AdminMiddleware');

router.route('/')
    .get(productsController.getProducts);

//router.param('productId', productsController.productParamMiddleware);
//router.route('/:productId').get(productsController.getProduct);

module.exports = router;
