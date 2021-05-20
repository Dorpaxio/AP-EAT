const Restaurant = require('../models/users/Restaurant');
const { RestaurantNotFoundError } = require('../errors');
const Menu = require('../models/Menu');

const excludedFields = ['first_name', 'last_name', 'email', 'phone', 'products', 'admin', 'type'];
const population = {
    path: 'menus',
    populate: {
        path: 'products',
        populate: {
            path: 'product',
            populate: {
                path: 'extras',
                populate: 'product'
            }
        }
    }
}

exports.getRestaurants = function (req, res, next) {
    const select = excludedFields.reduce((obj, next) => obj = { ...obj, [next]: 0 }, {});
    
    const query = Restaurant.find({}).populate(population).select(!req.user.admin ? select : {});
    return query.exec().then(function (restaurants) {
        return res.status(200).json(restaurants);
    }).catch(next);
}

exports.restaurantParamMiddleware = function (req, res, next, restaurantId) {
    const canSeeAllFields = req.user.admin || req.user._id.equals(restaurantId);
    const select = excludedFields.reduce((obj, next) => obj = { ...obj, [next]: 0 }, {});
    const query = Restaurant.findOne({ _id: restaurantId }).populate(population).select(!canSeeAllFields ? select : {});
    return query.exec().then(function (restaurant) {
        if (!restaurant) throw new RestaurantNotFoundError();
        req.restaurant = restaurant;
        return next();
    }).catch(next);
}

exports.getRestaurant = function (req, res) {
    return res.status(200).json(req.restaurant);
}
