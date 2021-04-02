const router = require('express').Router();
const productsController = require('../../controllers/ProductsController');
const isAdmin = require('../../middlewares/AdminMiddleware');

router.route('/')
    .get(isAdmin, productsController.getProducts);

//router.param('productId', productsController.productParamMiddleware);
//router.route('/:productId').get(productsController.getProduct);

module.exports = router;

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Récupère tous les produits (Admin)
 *     description: Récupère tous les produits **Admin**
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Retourne tous les produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Requiert une authentification'
 *
 */
