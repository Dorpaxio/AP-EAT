const Product = require('../models/Product');

exports.getProducts = function (req, res) {
    return Product.find({}, function (err, products) {
       if(err) return res.status(500).send(err);
       return res.status(200).json(products);
    });
}
