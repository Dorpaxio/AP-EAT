const Product = require('../models/Product');
const Restaurant = require('../models/users/Restaurant');
const {ForbiddenError, ProductNotFoundError, NotRestaurantOwnerError} = require('../errors');

exports.getProducts = function (req, res, next) {
    if (!req.user.admin) {
        if (req.user.type === 'restaurant') return Restaurant.findOne({_id: req.user._id}).populate('products')
            .then(function (restaurant) {
                return res.status(200).json(restaurant.products);
            });
        throw new ForbiddenError('PR40301', 'You are neither an admin or a restaurant.');
    }
    return Product.find({}).then(function (products) {
        return res.status(200).json(products);
    }).catch(next);
}

exports.productParamMiddleware = function (req, res, next, productId) {
    return Product.findOne({_id: productId}).then(function (product) {
        if(!product) throw new ProductNotFoundError();
        req.product = product;
        return next();
    }).catch(next);
}

exports.getRestaurantProducts = async function (req, res, next) {
    if (!req.restaurant._id.equals(req.user._id))
        throw new NotRestaurantOwnerError();

    return res.status(200).json((await req.restaurant.populate('products').execPopulate()).products);
}

exports.addProductToRestaurant = function (req, res, next) {
    if (!req.restaurant._id.equals(req.user._id))
        throw new NotRestaurantOwnerError();

    return req.user.addProduct(req.body).then(function (products) {
        return res.status(201).json(products);
    }).catch(next);
}

exports.deleteProductFromRestaurant = function (req, res, next) {
    if (!req.restaurant._id.equals(req.user._id))
        throw new NotRestaurantOwnerError();

    return req.user.deleteProduct(req.product._id).then(function (restaurant) {
        return res.status(200).json(restaurant);
    }).catch(next);
}
