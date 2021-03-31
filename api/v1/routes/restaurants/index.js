const router = require('express').Router();
const restaurantsController = require('../../controllers/RestaurantsController');

router.route('/')
    .get(restaurantsController.getRestaurants);

router.param('restaurantId', restaurantsController.restaurantParamMiddleware);
router.route('/:restaurantId')
    .get(restaurantsController.getRestaurant);

module.exports = router;
