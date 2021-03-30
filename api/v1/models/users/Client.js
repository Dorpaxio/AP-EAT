const mongoose = require('mongoose');
const User = require('./User');

const clientSchema = new mongoose.Schema({

});

module.exports = User.discriminator('client', clientSchema);

