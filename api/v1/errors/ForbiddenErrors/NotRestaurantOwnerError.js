const ForbiddenError = require('./ForbiddenError');

module.exports = class NotRestaurantOwnerError extends ForbiddenError {
    constructor(code, message) {
        super(403, code || 'NRO403', message || 'You are not the restaurant owner');
    }
}
