const router = require('express').Router();
const authController = require('../../controllers/AuthController');
const {body} = require('express-validator');
const validation = require('../../../../lib/ValidationHandlerMiddleware');

router.route('/')
    .all(body('email').not().isEmpty().isEmail().normalizeEmail(),
        body('password').not().isEmpty().isLength({min: 8}))
    .post(validation, authController.login)
    .put(body('first_name').not().isEmpty().trim().escape(),
        body('last_name').not().isEmpty().trim().escape(),
        body('phone').not().isEmpty().isMobilePhone('fr-FR'),
        body('address.street').not().isEmpty().trim().escape(),
        body('address.additional').trim().escape(),
        body('address.city').not().isEmpty().trim().escape(),
        body('address.country').not().isEmpty().trim().escape(),
        body('address.zip').not().isEmpty().isPostalCode('FR'),
        validation,
        authController.register);

module.exports = router;
