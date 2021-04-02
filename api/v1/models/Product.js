const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    img_url: {type: String, required: false},
    extras: {
        type: [{
            _id: false,
            __v: false,
            product: {type: mongoose.Types.ObjectId, ref: 'Product', required: true},
            price: {type: Number, default: 0}
        }],
        required: false
    },
    type: {type: String, required: false}
});

module.exports = mongoose.model('Product', productSchema);
