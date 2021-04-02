const Cart = require('../models/Cart'),
    Restaurant = require('../models/users/Restaurant'),
    Menu = require('../models/Menu');
const {validationResult} = require('express-validator');

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

exports.addInCart = async function (req, res) {
    const client = req.user;
    const {menu, restaurant} = req.body;

    if (client.type !== 'client') {
        return res.status(403).json({ok: false, code: 'CA40300', message: 'Only clients can add elements in cart'});
    }

    console.log('1');
    return Menu.exists({_id: menu})
        .then(function (exists) {
            console.log('2');
            if (!exists) {
                return Promise.reject({
                    statusCode: 404,
                    error: {
                        ok: false,
                        code: 'CA40401',
                        message: 'This menu does not exist.'
                    }
                })
            }
            return Restaurant.findOne({_id: restaurant}).exec();
        }).then(function (restaurant) {
            console.log('3');
            if (!restaurant) {
                return Promise.reject({
                    statusCode: 404,
                    error: {
                        ok: false,
                        code: 'CA40402',
                        message: 'This restaurant does not exist.'
                    }
                })
            }
            return Cart.findOne({client: client._id}).exec();
        }).then(function (cart) {
            console.log('4');
            if (cart) {
                if (cart['restaurant'] !== restaurant) return res.status(409).json({
                    ok: false,
                    code: 'CA40900',
                    message: 'Cart has already a menu from a different restaurant'
                });
            } else {
                cart = new Cart({client: client._id, restaurant, menus: []});
            }

            cart['menus'].push(menu);
            return cart.save(function (err, cart) {
                if (err) return res.status(500).send(err);
                return res.status(201).send();
            });
        }).catch(function (err) {
            console.log('err', err);
            if (err && err.statusCode && err.error) {
                return res.status(err.statusCode).send(err.error);
            }
            return res.status(500).send(err);
        });
}
