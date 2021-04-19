const mongoose = require('mongoose');
const Menu = require('./Menu');
const Restaurant = require('./users/Restaurant');
const {MenuNotFoundError, RestaurantNotFoundError, ConflictError} = require('../errors');

/**
 * @class Cart
 * @property {ObjectId} _id Identifiant du panier
 * @property {ObjectId} restaurant Identifiant du restaurant associé au panier
 * @property {ObjectId} client Identifiant du client détenteur du panier
 * @property {[ObjectId]} menus Identifiants du/des menu(s) ajouté(s) par le client
 */
const cartSchema = new mongoose.Schema({
    restaurant: {type: mongoose.Types.ObjectId, ref: 'Restaurant', required: true},
    client: {type: mongoose.Types.ObjectId, ref: 'Client', required: true},
    menus: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'Menu',
            required: true,
        }],
        required: true
    }
});

/**
 * @alias Cart.prototype.addMenu
 * @param menuId {ObjectId} Identifiant du menu à ajouter
 * @param restaurantId {ObjectId} Identifiant du restaurant
 * @returns {Promise<Cart>} Retourne le panier à jour
 */
cartSchema.methods.addMenu = async function (menuId, restaurantId) {
    const menu = await Menu.findOne({_id: menuId});
    if(!menu) throw new MenuNotFoundError();

    const restaurant = await Restaurant.findOne({_id: restaurantId});
    if(!restaurant) throw new RestaurantNotFoundError();

    if(!this.restaurant.equals(restaurant._id))
        throw new ConflictError('CA40900', 'Cart has already a menu from a different restaurant');

    this.menus.push(menu);
    return this.save();
}

module.exports = mongoose.model('Cart', cartSchema);
