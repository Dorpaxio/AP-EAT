const router = require('express').Router();
const cartsController = require('../../controllers/CartsController');
const isAdmin = require('../../middlewares/AdminMiddleware');

router.route('/')
    .get(isAdmin, cartsController.getCarts);

router.param('cartId', cartsController.cartParamMiddleware);
router.route('/:cartId')
    .get(isAdmin, cartsController.getCart);


module.exports = router;

/**
 * @openapi
 * /carts:
 *   get:
 *     summary: Récupérer tous les paniers. (Admin)
 *     description: Récupérer tous les paniers. **Admin**
 *     tags:
 *       - Carts
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Retourne tous les paniers de l'API.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: N'est pas administateur (**AD40300**)
 *
 */
