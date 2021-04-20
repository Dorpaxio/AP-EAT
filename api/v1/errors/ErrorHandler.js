const APEatError = require('./APEatError');

module.exports = function errorHandler (err, req, res, next) {
    if(err instanceof APEatError) return res.status(err.statusCode).json({code: err.code, message: err.message});

    console.error(err);
    return res.status(500).send({message: err.message});
}
