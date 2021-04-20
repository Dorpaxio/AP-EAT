const NotFoundError = require('./NotFoundError');

module.exports = class RestaurantNotFoundError extends NotFoundError {
    constructor(code, message) {
        super(code || 'RNF404', message || 'Restaurant not found');
    }
}
