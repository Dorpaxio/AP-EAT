const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    img_url: {type: String, required: false},
    extras: {
        type: [{
            type: {
                _id: false,
                __v: false,
                product: {type: mongoose.Types.ObjectId, required: true},
                price: {type: Number, default: 0}
            },
            ref: 'Product'
        }],
        required: false
    },
    type: {type: String, required: false}
});

module.exports = mongoose.model('Product', productSchema);
