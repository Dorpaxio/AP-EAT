const mongoose = require('mongoose');
const Cart = require('../Cart');

const clientSchema = new mongoose.Schema({

});

/**
 * @alias Client.prototype.getCart
 * @returns {Promise<Cart>}
 */
clientSchema.methods.getCart = function () {
    return Cart.findOne({client: this._id}).then(function (cart) {
        return cart || {};
    });
}

/**
 * Ajoute un élément dans le panier de l'utilisateur
 * @alias Client.prototype.addInCart
 * @param menuId {ObjectId} Identifiant du menu
 * @param restaurantId {ObjectId} Identifiant du restaurant
 * @returns {Promise<Cart>} Retourne le panier modifié
 */
clientSchema.methods.addInCart = function(menuId, restaurantId) {
    const client = this;
    return Cart.findOne({client: client._id}).then(function (cart) {
        if (!cart) cart = new Cart({client: client._id, restaurant: restaurantId, menus: []});
        return cart.addMenu(menuId, restaurantId);
    });
}

/**
 * @class Client
 * @augments User
 */
module.exports = require('./User').discriminator('client', clientSchema);

