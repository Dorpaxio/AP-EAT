const router = require('express').Router();
const isAdmin = require('../../middlewares/AdminMiddleware');
const usersController = require('../../controllers/UsersController');

router.route('/')
    .get(isAdmin, usersController.getUsers);

router.use('/me', require('./me'));

module.exports = router;
