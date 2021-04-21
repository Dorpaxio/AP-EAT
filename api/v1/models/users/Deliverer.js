const mongoose = require('mongoose');

const delivererSchema = new mongoose.Schema({

}, {discriminatorKey: 'type'});

/**
 * @class Deliverer
 * @augments User
 */
module.exports = require('./User').discriminator('deliverer', delivererSchema);

