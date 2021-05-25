const Cart = require('../models/Cart');
const {ForbiddenError, CartNotFoundError} = require('../errors');

exports.getCarts = function (req, res) {
    return Cart.find({}, function (err, carts) {
        if (err) return res.status(500).send(err);
        return res.status(200).json(carts);
    });
}

exports.cartParamMiddleware = function (req, res, next, cartId) {
    return Cart.findOne({_id: cartId}).then(function (cart) {
        if (!cart) throw new CartNotFoundError();
        req.cart = cart;
        return next();
    }).catch(next);
}

exports.getCart = function (req, res) {
    return res.status(200).json(req.cart);
}

exports.getClientCart = function (req, res, next) {
    if (req.user.type !== 'client') throw new ForbiddenError('CA40301', 'Only clients have a cart.');
    return req.user.getCart().then(function (cart) {
        return res.status(200).json(cart);
    }).catch(next);
}

exports.addInCart = async function (req, res, next) {
    try {
        const client = req.user;
        const {menu, restaurant} = req.body;

        if (client.type !== 'client')
            return next(new ForbiddenError('CA40300', 'Only clients can add elements in cart'));

        return res.status(200).json(await client.addInCart(menu, restaurant));
    } catch(err) {
        next(err);
    }
}

exports.deleteCart = function (req, res, next) {
    Cart.deleteOne({client: req.user._id}).then(function (result) {
        return res.status(204).send();
    }).catch(next);
}
