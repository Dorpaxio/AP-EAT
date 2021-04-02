const Product = require('../models/Product');

exports.getProducts = function (req, res) {
    return Product.find({}, function (err, products) {
        if (err) return res.status(500).send(err);
        return res.status(200).json(products);
    });
}

exports.getRestaurantProducts = function (req, res) {
    return res.status(200).json(req.restaurant.products);
}

exports.addProductToRestaurant = function (req, res) {
    const restaurant = req.user;

    const newProduct = new Product(req.body);
    return newProduct.save()
        .then(function (product) {
          restaurant.products.push(product);
          return restaurant.save();
        }).then(function (restaurant) {
            return res.status(201).header('Link', `/products/${newProduct._id}`).send();
        }).catch(function (err) {
            return res.status(500).send(err);
        });
}
