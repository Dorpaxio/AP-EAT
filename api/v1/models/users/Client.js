const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({

});

/**
 * @class Client
 * @augments User
 */
module.exports = require('./User').discriminator('client', clientSchema);

