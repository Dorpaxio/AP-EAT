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
    const filter = req.query.filter;
    const select = excludedFields.reduce((obj, next) => obj = { ...obj, [next]: 0 }, {});
    
    if (filter) {
        const query = Restaurant.find({}).populate({path: 'menus'}).select(!req.user.admin ? select : {})
        return query.exec().then(function (restaurants) {
            let filteredRestaurants = [];
            restaurants.forEach(restaurant => {
                for (const menu of restaurant.menus) {
                    if (menu.category === filter) {
                        filteredRestaurants.push(restaurant);
                        break;
                    }
                }
            });

            console.log(filteredRestaurants);
            return res.status(200).json(filteredRestaurants);
        }).catch(next);
    }

    const query = Restaurant.find({}).select(!req.user.admin ? select : {});
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
