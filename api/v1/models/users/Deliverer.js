const mongoose = require('mongoose');
const User = require('./User');

const delivererSchema = new mongoose.Schema({

}, {discriminatorKey: 'type'});

module.exports = User.discriminator('deliverer', delivererSchema);

