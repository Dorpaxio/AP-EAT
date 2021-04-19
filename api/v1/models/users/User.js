const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    admin: {type: Boolean, default: false}
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

userSchema.methods.comparePassword = function (candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err) return reject(err);
            resolve(isMatch);
        });
    });
};

module.exports = mongoose.model('User', userSchema);
