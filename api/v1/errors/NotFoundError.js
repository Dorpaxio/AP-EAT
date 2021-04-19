const APEatError = require('./APEatError');

module.exports = class NotFoundError extends APEatError {
    constructor(code, message) {
        super(404, code || 'NF404', message || 'Not found error');
    }
}
