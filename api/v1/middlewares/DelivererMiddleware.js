const {UnauthorizedError, ForbiddenError} = require('../errors');

module.exports = function (req, res, next) {
    if (!req.user) throw new UnauthorizedError();
    if((req.user.type && req.user.type === 'deliverer') || req.user.admin) return next();
    throw new ForbiddenError('CLM403');
}
