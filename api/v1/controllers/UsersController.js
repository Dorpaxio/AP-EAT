const User = require('../models/users/User');

exports.getUsers = function (req, res) {
    return User.find({}, function (err, users) {
       if(err) return res.status(500).send(err);
       return res.status(200).json(users);
    });
}
