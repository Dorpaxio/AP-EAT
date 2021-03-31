module.exports = function (req, res, next) {
    if(!req.user) {
        return res.status(401).json({ok: false, code: 'RE40100', message: 'Authentication required.'});
    }

    if((req.user.type && req.user.type === 'restaurant') || req.user.admin) {
        return next();
    }

    return res.status(403).json({ok: false, code: 'RE40300', message: `You don't have access to this resource.`})
}
