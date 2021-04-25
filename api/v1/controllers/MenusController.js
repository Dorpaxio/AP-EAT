const Menu = require('../models/Menu');
const Restaurant = require('../models/users/Restaurant');
const Product = require('../models/Product');
const {ForbiddenError, RestaurantNotFoundError, ProductNotFoundError} = require('../errors');

exports.getMenus = async function (req, res, next) {
    try {
        let menus;
        if (req.user.type && req.user.type === 'restaurant') {
            menus = (await req.user.populate('menus').execPopulate()).menus;
        } else if (req.user.admin) {
            menus = await Menu.find().exec();
        } else {
            return next(new ForbiddenError());
        }

        return res.status(200).json(menus);
    } catch (err) {
        return next(err);
    }
}

exports.getRestaurantMenus = function (req, res, next) {
    return req.restaurant.populate('menus').execPopulate().then(function (restaurant) {
        return res.status(200).json(restaurant.menus);
    }).catch(next);
}

exports.createMenu = async function (req, res, next) {
    try {
        let {restaurant, menu} = req.body;
        let restau;
        if(!restaurant) {
            restau = req.user;
            if(restau.type !== 'restaurant') return next(new ForbiddenError());
        }

        if(restaurant && req.user.admin) {
            restau = await Restaurant.findOne({_id: restaurant});
            if(!restaurant) return next(new RestaurantNotFoundError());
        }

        const products = [...new Set(menu.products.map(product => product.product.toString()))];
        const existingProducts = await Product.find({_id: {$in: products}});

        if(products.length < existingProducts.length)
            return next(new ProductNotFoundError('ME40400', 'At least one product has been not found'));

        const newMenu = await new Menu(menu).save();
        return Restaurant.findOneAndUpdate({_id: restau._id}, {$push: {menus: newMenu._id}}).then(function () {
            return res.status(201).json(newMenu);
        }).catch(function (err) {
            Menu.deleteOne({_id: newMenu._id});
            return next(err);
        });
    } catch (err) {
        return next(err);
    }
}
