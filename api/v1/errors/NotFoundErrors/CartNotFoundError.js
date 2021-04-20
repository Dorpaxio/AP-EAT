const NotFoundError = require('./NotFoundError');

module.exports = class CartNotFoundError extends NotFoundError {
    constructor(code, message) {
        super(code || 'CANF404', message || 'Cart not found');
    }
}
