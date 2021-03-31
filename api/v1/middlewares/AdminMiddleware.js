module.exports = function (req, res, next) {
    if(!req.user) {
        return res.status(401).json({ok: false, code: 'AD40100', message: 'Authentication required.'});
    }

    if(req.user.admin) {
        return next();
    }

    return res.status(403).json({ok: false, code: 'AD40300', message: `Permission needed.`})
}
