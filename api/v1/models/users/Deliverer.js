const mongoose = require('mongoose');

const delivererSchema = new mongoose.Schema({

}, {discriminatorKey: 'type'});

module.exports = require('./User').discriminator('deliverer', delivererSchema);

