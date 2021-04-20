const APEatError = require('./APEatError');

module.exports = class UnauthorizedError extends APEatError {
    constructor(code, message) {
        super(401, code || 'AE401', message || 'Unauthorized Access');
    }
}
