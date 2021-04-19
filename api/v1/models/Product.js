const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    img_url: {type: String, required: false},
    extras: {
        type: [{
            _id: false,
            __v: false,
            product: {type: mongoose.Types.ObjectId, ref: 'Product', required: true},
            price: {type: Number, default: 0}
        }],
        required: false
    },
    type: {type: String, required: false}
});

/**
 * @class Product
 * @property {ObjectId} _id Identifiant du produit
 * @property {string} name Nom du produit
 * @property {string} description Description du produit
 * @property {string} img_url Adresse de l'image de présentation du produit
 * @property {[{product:ObjectId, price: number}]} extras Suppléments du produit
 * @property {string} type Type du produit
 */
module.exports = mongoose.model('Product', productSchema);
