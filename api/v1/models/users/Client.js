const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({

});

module.exports = require('./User').discriminator('client', clientSchema);

