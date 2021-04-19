const Cart = require('../models/Cart'),
    Restaurant = require('../models/users/Restaurant'),
    Menu = require('../models/Menu');
const {validationResult} = require('express-validator');
const {ForbiddenError} = require('../errors');

exports.getCarts = function (req, res) {
    return Cart.find({}, function (err, carts) {
        if (err) return res.status(500).send(err);
        return res.status(200).json(carts);
    });
}

exports.cartParamMiddleware = function (req, res, next, cartId) {
    return Cart.findOne({_id: cartId}, function (err, cart) {
        if (err) return res.status(500).send(err);
        if (!cart) return res.status(404).json({ok: false, code: 'CA40400', message: 'Cart not found.'});

        req.cart = cart;

        return next();
    });
}

exports.getCart = function (req, res) {
    return res.status(200).json(req.cart);
}

exports.getClientCart = function (req, res) {
    return Cart.findOne({client: req.client._id}, function (err, cart) {
        if (err) return res.status(500).send(err);
        return res.status(200).json(cart || {});
    });
}

exports.addInCart = async function (req, res, next) {
    const client = req.user;
    const {menu, restaurant} = req.body;

    if (client.type !== 'client') return next(new ForbiddenError('CA40300', 'Only clients can add elements in cart'));

    return Cart.findOne({client: client._id}).then(function (cart) {
       if(!cart) cart = new Cart({client: client._id, restaurant, menus: []});
       return cart.addMenu(menu, restaurant);
    }).then(function (cart) {
        return res.status(200).json(cart);
    }).catch(next);
}
