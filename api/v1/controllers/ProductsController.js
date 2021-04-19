const Product = require('../models/Product');
const Restaurant = require('../models/users/Restaurant');
const {ForbiddenError} = require('../errors');

exports.getProducts = function (req, res, next) {
    if (!req.user.admin) {
        if (req.user.type === 'restaurant') return Restaurant.findOne({_id: req.user._id}).populate('products')
            .then(function (restaurant) {
                return res.status(200).json(restaurant.products);
            });
        throw new ForbiddenError('PR40302', 'You are neither an admin or a restaurant.');
    }
    return Product.find({}).then(function (products) {
        return res.status(200).json(products);
    }).catch(next);
}

exports.getRestaurantProducts = function (req, res, next) {
    if (!req.restaurant._id.equals(req.user._id))
        return next(new ForbiddenError('PR40300', 'You have to be the restaurant owner.'));

    return res.status(200).json(req.restaurant.products);
}

exports.addProductToRestaurant = function (req, res, next) {
    if (!req.restaurant._id.equals(req.user._id))
        return next(new ForbiddenError('PR40301', 'You have to be the restaurant owner.'));

    return req.user.addProduct(req.body).then(function (products) {
        return res.status(201).json(products);
    }).catch(next);
}
