const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    img_url: {type: String, required: false},
    products: {
        type: [{
            type: {
                _id: false,
                __v: false,
                product: {type: mongoose.Types.ObjectId, required: true},
                price: {type: Number, required: true}
            },
            ref: 'Product'
        }],
        required: true
    },
    category: {type: String, required: false}
});

module.exports = mongoose.model('Menu', menuSchema);
