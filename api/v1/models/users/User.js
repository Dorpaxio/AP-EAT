const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true, select: false},
    address: {
        type: {
            street: {type: String, required: true},
            additional: {type: String, required: false},
            city: {type: String, required: true},
            zip: {type: String, required: true},
            country: {type: String, default: 'France'}
        },
        required: true
    },
    admin: {type: Boolean, default: false},
    type: {type: String, default: 'client'}
}, {discriminatorKey: 'type'});

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (error, hash) => {
            if (err) return next(err);

            this.password = hash;
            next();
        });
    });
});

/**
 * @alias User.prototype.comparePassword
 * @param candidatePassword {string}
 * @returns {Promise<boolean>}
 */
userSchema.methods.comparePassword = function (candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err) return reject(err);
            resolve(isMatch);
        });
    });
};

/**
 * @alias Client.prototype.getCart
 * @returns {Promise<Cart>}
 */
userSchema.methods.getCart = function () {
    const Cart = require('../../models/Cart');
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
userSchema.methods.addInCart = function(menuId, restaurantId) {
    const client = this;
    const Cart = require('../../models/Cart');
    return Cart.findOne({client: client._id}).then(function (cart) {
        if (!cart) cart = new Cart({client: client._id, restaurant: restaurantId, menus: []});
        return cart.addMenu(menuId, restaurantId);
    });
}

/**
 * @class User
 * @property {ObjectId} _id Identifiant de l'utilisateur
 * @property {string} first_name Prénom de l'utilisateur
 * @property {string} last_name Nom de famille de l'utilisateur
 * @property {string} email E-mail de l'utilisateur
 * @property {string} phone Numéro de téléphone de l'utilisateur
 * @property {string} password Mot de passe crypté de l'utilisateur
 * @property {{street: string, additional?: string, city: string, zip: string, country: string}} address Adresse de l'utilisateur
 * @property {boolean} admin Vrai si l'utilisateur est administrateur
 * @property {'client'|'restaurant'|'deliverer'} type Type de compte de l'utilisateur
 */
module.exports = mongoose.model('User', userSchema);
