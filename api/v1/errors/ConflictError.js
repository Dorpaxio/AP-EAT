const APEatError = require('./APEatError');

module.exports = class ConflictError extends APEatError {
    constructor(code, message) {
        super(409, code || 'CF409', message || 'Conflict');
    }
}
