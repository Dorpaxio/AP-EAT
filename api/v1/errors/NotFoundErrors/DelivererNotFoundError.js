const NotFoundError = require('./NotFoundError');

module.exports = class DelivererNotFoundError extends NotFoundError {
    constructor(code, message) {
        super(code || 'DENF404', message || 'Deliverer not found');
    }
}
