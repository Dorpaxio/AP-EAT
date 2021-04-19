const APEatError = require('./APEatError');

module.exports = function errorHandler (err, req, res, next) {
    if(err instanceof APEatError) {
        return res.status(err.statusCode).json({ok: false, code: err.code, message: err.message});
    }
    console.error(err);
    return res.status(500).send({ok: false, message: err.message});
}
