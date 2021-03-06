const Order = require('../models/Order');
const {
    OrderNotFoundError,
    ForbiddenError,
    CartNotFoundError,
    RestaurantNotFoundError,
    DelivererNotFoundError
} = require('../errors');
const Cart = require('../models/Cart');
const Restaurant = require('../models/users/Restaurant');
const Deliverer = require('../models/users/Deliverer');

const restaurantIncludeFields = ['restaurant_name', 'phone', 'email', 'address'];
const clientIncludeFields = ['first_name', 'last_name', 'name', 'phone', 'email', 'address'];

exports.getOrders = function (req, res, next) {
    let query;
    switch (req.user.type) {
        case 'restaurant':
            query = {restaurant: req.user._id};
            break;
        case 'deliverer':
            query = {deliverer: req.user._id};
            break;
        default:
            query = {client: req.user._id};
            break;
    }

    const {status} = req.query;
    if (status) query = {...query, status};

    return Order.find(query).populate([
        { path: 'restaurant', select: restaurantIncludeFields},
        { path: 'client', select: clientIncludeFields},
        { path: 'menus', populate: 
            { path: 'products',
                populate: 'product'
            }
        }
    ]).then(function (orders) {
        return res.status(200).json(orders);
    }).catch(next);
}

exports.orderParamMiddleware = function (req, res, next, orderId) {
    return Order.findOne({_id: orderId}).then(function (order) {
        if (!order) throw new OrderNotFoundError();
        if (!order[req.user.type] || !order[req.user.type].equals(req.user._id))
            throw new ForbiddenError('OR40300', 'You cannot access to this order');
        req.order = order;
        return next();
    }).catch(next);
}

exports.getOrder = function (req, res) {
    return res.status(200).json(req.order);
}

exports.passOrder = async function (req, res, next) {
    try {
        const cartId = req.body.cart;
        const {credit_card} = req.body;

        let query = {_id: cartId};
        if (!cartId) query = {client: req.user._id};

        const cart = await Cart.findOne(query).populate([
            { path: 'client', clientIncludeFields },
            { path: 'menus', populate:
                {
                    path: 'products',
                    populate: 'product'
                }
            }
        ]);
        if (!cart) return next(new CartNotFoundError());

        const restaurant = await Restaurant.findOne({ _id: cart.restaurant }, restaurantIncludeFields);
        if (!restaurant) return new RestaurantNotFoundError();

        const ordersBeingDelivered = await Order.find({status: {$ne: 'delivered'}}, {deliverer: true});
        const deliverer = await Deliverer.findOne({_id: {$nin: ordersBeingDelivered.map(o => o.deliverer)}});
        if (!deliverer) return next(new DelivererNotFoundError('OR40400', 'There is no deliverer available'));

        const newOrder = new Order({
            restaurant,
            client: cart.client,
            menus: cart.menus,
            deliverer: deliverer._id,
            payment: {credit_card}
        });
        const order = await newOrder.save();
        return res.status(201).json(order);
    } catch (err) {
        return next(err);
    }
}

exports.updateStatus = async function (req, res, next) {
    const orderId = req.order;
    const status = req.body.status;

    try {
        const order = await Order.findOne({ _id: orderId });
        return res.status(201).json(await order.updateStatus(status));
    } catch (err) {
        return next(err);
    }
}