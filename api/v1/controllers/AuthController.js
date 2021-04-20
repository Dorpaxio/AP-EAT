const User = require('../models/users/User');
const config = require('../../../config');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const {UserNotFoundError, ConflictError} = require('../errors');

/* Nous authentifions nos utilisateurs avec des JWT, en revanche, pour un gain de temps, nous n'utiliserons pas
* de RefreshToken et nous fixons l'expiration des AccessToken à une date lointaine. Ce procédé est évidemment
* non recommandé car il expose les utilisateurs à des vols de Token. */

const generateToken = exports.generateToken = function generateToken(userId) {
    return jwt.sign({uid: userId}, config.jwt_secret, {expiresIn: '2w'});
}

exports.checkToken = function (req, res, next) {
    return expressJwt({
        secret: config.jwt_secret, getToken: function fromHeaderOrQuerystring(req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.cookies && req.cookies.accessToken) {
                return req.cookies.accessToken;
            }
            return null;
        }, algorithms: ['HS256']
    })(req, res, function (error) {
        if (error) return res.status(error.status).send(error);
        User.findOne({_id: req.user.uid}, function (err, user) {
            if (err) return next(err);
            if (!user) return next(new UserNotFoundError());

            req.user = user;

            return next();
        });
    });
}

function authorizeUser(user, req, res) {
    let {password, ...noPassUser} = user._doc;
    const accessToken = generateToken(user._id);
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.PRODUCTION,
        maxAge: 2 * 7 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json({
        token: accessToken,
        expires: Date.now() + 2 * 7 * 24 * 60 * 60 * 1000,
        user: noPassUser
    });
}

exports.register = async function (req, res, next) {
    try {
        const isFirstUser = (await User.findOne({}).exec()) === null;
        const user = await User.findOne({email: req.body.email});
        if (user) return next(new ConflictError('AU40900', 'Email is already in use.'));

        return (new User({...req.body, admin: isFirstUser})).save()
            .then(function (user) {
                return authorizeUser(user, req, res);
            }).catch(next);
    } catch (err) {
        next(err);
    }
}

exports.login = async function (req, res, next) {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email}, '+password');
        if (!user)
            return next(new UserNotFoundError('AU40401', 'Wrong email or password.'));

        if (!(await user.comparePassword(password)))
            return next(new UserNotFoundError('AU40401', 'Wrong email or password.'));

        return authorizeUser(user, req, res);
    } catch (err) {
        next(err);
    }
}

exports.getCurrentUser = function (req, res) {
    return res.status(200).json(req.user);
}




