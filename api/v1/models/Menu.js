const mongoose = require('mongoose');

/**
 * @class Menu
 * @property {ObjectId} _id Identifiant du menu
 * @property {string} name Nom du menu
 * @property {string} description Description du menu
 * @property {string} img_url Adresse de l'image de présentation du menu
 * @property {[{product:ObjectId, price: number}]} products Produits contenus dans le menu
 * @property {string} category Catégorie du menu
 */
const menuSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    img_url: {type: String, required: false},
    products: {
        type: [{
            _id: false,
            __v: false,
            product: {type: mongoose.Types.ObjectId, ref: 'Product', required: true},
            price: {type: Number, required: true}
        }],
        required: true
    },
    category: {type: String, required: false}
});

module.exports = mongoose.model('Menu', menuSchema);
