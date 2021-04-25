const router = require('express').Router();
const ordersController = require('../controllers/OrdersController');
const isClient = require('../middlewares/ClientMiddleware');

router.route('/')
    .get(ordersController.getOrders)
    .post(isClient, ordersController.passOrder);

router.param('orderId', ordersController.orderParamMiddleware);

router.route('/:orderId')
    .get(ordersController.getOrder);

module.exports = router;
