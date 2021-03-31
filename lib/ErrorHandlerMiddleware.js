module.exports = function (req, res, next) {
    const send = res.send;
    res.send = function (err) {
        if(res.statusCode === 500) {
            console.error(err);
        }
        send.call(this, err);
    }

    next();
}
