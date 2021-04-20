const NotFoundError = require('./NotFoundError');

module.exports = class MenuNotFoundError extends NotFoundError {
    constructor(code, message) {
        super(code || 'MNF404', message || 'Menu not found');
    }
}
