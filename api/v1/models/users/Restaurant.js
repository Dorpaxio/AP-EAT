const mongoose = require('mongoose');
const Product = require('../Product');

const restaurantSchema = new mongoose.Schema({
    restaurant_name: {type: String, required: true},
    products: {type: [{type: mongoose.Types.ObjectId, ref: 'Product'}], default: []},
    menus: {type: [{type: mongoose.Types.ObjectId, ref: 'Menu'}], default: []}
}, {discriminatorKey: 'type'});

/**
 * @alias Restaurant.prototype.addProduct
 * @param product {Product} Produit à ajouter
 * @returns {Promise<[Product]>} Liste des produits mise à jour
 */
restaurantSchema.methods.addProduct = async function (product) {
    const newProduct = await new Product(product).save();
    this.products.push(newProduct._id);

    return this.save().then(function (restaurant) {
        return restaurant.populate('products').execPopulate();
    }).then(function (restaurant) {
        return restaurant.products;
    });
}

/**
 * @class Restaurant
 * @augments User
 * @property {string} restaurant_name Nom du restaurant
 * @property {[ObjectId|Product]} products Produits du restaurant
 * @property {[ObjectId|Menu]} menus Menus du restaurant
 */
module.exports = require('./User').discriminator('restaurant', restaurantSchema);

