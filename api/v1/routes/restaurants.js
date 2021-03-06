const router = require('express').Router();
const restaurantsController = require('../controllers/RestaurantsController');
const productsController = require('../controllers/ProductsController');
const menusController = require('../controllers/MenusController');
const isRestaurant = require('../middlewares/RestaurantMiddleware');

router.route('/')
    .get(restaurantsController.getRestaurants);

router.param('productId', productsController.productParamMiddleware);
router.param('restaurantId', restaurantsController.restaurantParamMiddleware);

router.route('/:restaurantId')
    .get(restaurantsController.getRestaurant);

router.route('/:restaurantId/products')
    .get(isRestaurant, productsController.getRestaurantProducts)
    .post(isRestaurant, productsController.addProductToRestaurant);

router.route('/:restaurantId/products/:productId')
    .delete(isRestaurant, productsController.deleteProductFromRestaurant);

router.route('/:restaurantId/menus')
    .get(menusController.getRestaurantMenus);

module.exports = router;
