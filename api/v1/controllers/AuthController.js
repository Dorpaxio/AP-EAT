const User = require('../models/users/User');
const config = require('../../../config');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const {validationResult} = require('express-validator');

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
            if (err) return res.status(500).send(err);
            if (!user) return res.status(404).json({ok: false, code: 'AU40400', message: 'User not found.'});

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
        ok: true,
        token: accessToken,
        expires: Date.now() + 2 * 7 * 24 * 60 * 60 * 1000,
        user: noPassUser
    });
}

exports.register = function (req, res) {
    return User.findOne({}, function (err, user) {
        if (err) return res.status(500).send(err);
        const isFirstUser = user === null;

        return User.findOne({email: req.body.email}, function (err, user) {
            if (err) return res.status(500).send(err);
            if (user) return res.status(409).json({ok: false, code: 'AU40900', message: 'Email is already in use.'});

            const newUser = new User({
                ...req.body,
                admin: isFirstUser
            });

            return newUser.save(function (err, user) {
                if (err) return res.status(500).send(err);
                return authorizeUser(user, req, res);
            });
        });
    });
}

exports.login = function (req, res) {
    const {email, password} = req.body;

    User.findOne({email: email}, '+password', function (err, user) {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).json({ok: false, code: 'AU40401', message: 'Wrong email or password.'});

        user.comparePassword(password).then(function (match) {
            if (match) return authorizeUser(user, req, res);
            return res.status(404).json({ok: false, code: 'AU40401', message: 'Wrong email or password.'});
        }).catch(function (err) {
            return res.status(500).send(err);
        });
    });
}

exports.getCurrentUser = function (req, res) {
    return res.status(200).json(req.user);
}




