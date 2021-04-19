const NotFoundError = require('./NotFoundError');

module.exports = class MenuNotFoundError extends NotFoundError {
    constructor(code, message) {
        super(404, code || 'MNF404', message || 'Menu not found');
    }
}
