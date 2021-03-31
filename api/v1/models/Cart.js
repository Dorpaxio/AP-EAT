const mongoose = require('mongoose');

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

module.exports = mongoose.model('Cart', cartSchema);
