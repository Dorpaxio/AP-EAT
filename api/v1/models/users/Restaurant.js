const mongoose = require('mongoose');
const User = require('./User');

const restaurantSchema = new mongoose.Schema({
    restaurant_name: {type: String, required: true}
}, {discriminatorKey: 'type'});

module.exports = User.discriminator('restaurant', restaurantSchema);

