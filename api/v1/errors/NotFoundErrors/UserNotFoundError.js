const NotFoundError = require('./NotFoundError');

module.exports = class UserNotFoundError extends NotFoundError {
    constructor(code, message) {
        super(code || 'UNF404', message || 'User not found');
    }
}
