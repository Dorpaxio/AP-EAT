const mongoose = require('mongoose');
const User = require('./User');

const restaurantSchema = new mongoose.Schema({
    restaurant_name: {type: String, required: true},
    products: {type: [{type: mongoose.Types.ObjectId, ref: 'Product'}], default: []},
    menus: {type: [{type: mongoose.Types.ObjectId, ref: 'Menu'}], default: []}
}, {discriminatorKey: 'type'});

module.exports = User.discriminator('restaurant', restaurantSchema);

