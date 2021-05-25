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
    const category = req.query.category;
    const select = excludedFields.reduce((obj, next) => obj = { ...obj, [next]: 0 }, {});
    
    let query;
    if (category)
        query = Restaurant.find({}).populate({
            path: 'menus',
            match: { category: { $eq: category } },
            select: '_id'
        }).select(!req.user.admin ? select : {});
    else query = Restaurant.find({}).select(!req.user.admin ? select : {});

    return query.exec().then(function (restaurants) {
        if (category)
            return res.status(200).json(restaurants.reduce((result, restaurant) => { 
                if (restaurant.menus.length) { 
                    restaurant.menus = restaurant.menus.map(menu => menu._id); 
                    result.push(restaurant); 
                } return result; 
            }, []));
        else return res.status(200).json(restaurants);
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
