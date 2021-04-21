const mongoose = require('mongoose');
const Product = require('../Product');
const {ProductNotFoundError, ConflictError} = require('../../errors');

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
    if (product.extras && product.extras.length > 0) {
        const extraProducts = product.extras.map(p => p.product.toString());
        if(new Set([...extraProducts]).size < extraProducts.length)
            throw new ConflictError('REP409', 'One or several products are set as extra several times.');

        const extras = await Product.find({_id: {$in: extraProducts}}, {_id: true});
        if (extras.length < product.extras.length)
            throw new ProductNotFoundError('REP404', 'One or several extras contain unknown product');
    }
    const newProduct = await new Product(product).save();
    this.products.push(newProduct._id);

    return this.save().then(function (restaurant) {
        return restaurant.populate('products').execPopulate();
    }).then(function (restaurant) {
        return restaurant.products;
    });
}

/**
 * Supprime le produit du restaurant et toutes ses références dans les menus et suppléments
 * @alias Restaurant.prototype.deleteProduct
 * @param productId {mongoose.Types.ObjectId} Identifiant du produit à supprimer
 * @returns {Promise<[Restaurant]>} Restaurant mis à jour
 */
restaurantSchema.methods.deleteProduct = function (productId) {
    return Product.deleteOne({_id: productId}).exec().then(function (result) {
        if (result.deletedCount === 0) return this;
        return Product.updateMany({'extras.product': productId},
            {$pull: {extras: {product: productId}}}, {multi: true});
    }).then(() => {
        this.products = this.products.filter(product => !product.equals(productId));
        return this.save();
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

