const {validationResult} = require('express-validator');

module.exports = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            code: 'VH40000',
            message: 'Missing or bad formatted values',
            fields: Object.keys(errors.mapped())
        });
    }

    return next();
}
