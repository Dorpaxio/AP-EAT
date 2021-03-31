const Restaurant = require('../models/users/Restaurant');

const excludedFields = ['first_name', 'last_name', 'email', 'phone', 'products', 'admin', 'type'];

exports.getRestaurants = function (req, res) {
    const select = excludedFields.reduce((obj, next) => obj = {...obj, [next]: 0}, {});
    const query = Restaurant.find({}).select(req.user.type !== 'restaurant' ? select : {});
    return query.exec(function (err, restaurants) {
        if (err) return res.status(500).send(err);
        return res.status(200).json(restaurants);
    });
}

exports.restaurantParamMiddleware = function (req, res, next, restaurantId) {
    const select = excludedFields.reduce((obj, next) => obj = {...obj, [next]: 0}, {});
    const query = Restaurant.findOne({_id: restaurantId}).select(req.user.type !== 'restaurant' ? select : {});
    return query.exec(function (err, restaurant) {
        if (err) return res.status(500).send(err);
        if(!restaurant) return res.status(404).json({
            ok: false,
            code: 'RC40400',
            message: 'Restaurant not found'
        });

        req.restaurant = restaurant;

        return next();
    });
}

exports.getRestaurant = function (req, res) {
    return res.status(200).json(req.restaurant);
}
