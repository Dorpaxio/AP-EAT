const APEatError = require('./APEatError');

module.exports = class ForbiddenError extends APEatError {
    constructor(code, message) {
        super(403, code || 'FB403', message || 'Forbidden Access');
    }
}
