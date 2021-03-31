const Cart = require('../models/Cart');

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
       if(err) return res.status(500).send(err);
       return res.status(200).json(cart || {});
    });
}
