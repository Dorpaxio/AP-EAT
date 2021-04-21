const NotFoundError = require('./NotFoundError');

module.exports = class ProductNotFoundError extends NotFoundError {
    constructor(code, message) {
        super(code || 'PNF404', message || 'Product not found');
    }
}
