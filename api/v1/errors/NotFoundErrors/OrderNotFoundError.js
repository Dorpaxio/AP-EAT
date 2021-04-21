const NotFoundError = require('./NotFoundError');

module.exports = class OrderNotFoundError extends NotFoundError {
    constructor(code, message) {
        super(code || 'ONF404', message || 'Order not found');
    }
}
