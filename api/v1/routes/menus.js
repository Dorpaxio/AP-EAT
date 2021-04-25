const router = require('express').Router();
const menusController = require('../controllers/MenusController');
const {body} = require('express-validator');
const validation = require('../../../lib/ValidationHandlerMiddleware');

router.route('/')
    .get(menusController.getMenus)
    .post(body('restaurant').isMongoId().optional(),
        body('menu.products').not().isEmpty().isArray(),
        body('menu.products.*.product').not().isEmpty().isMongoId(),
        body('menu.products.*.price').not().isEmpty().isNumeric(),
        body('menu.name').not().isEmpty().trim().escape(),
        body('menu.description').not().isEmpty().trim().escape(),
        body('menu.img_url').optional().isURL(),
        body('menu.category').optional().trim().escape(),
        validation,
        menusController.createMenu);

module.exports = router;
