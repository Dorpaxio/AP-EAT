const router = require('express').Router();
const restaurantsController = require('../../controllers/RestaurantsController');

router.route('/')
    .get(restaurantsController.getRestaurants);

router.param('restaurantId', restaurantsController.restaurantParamMiddleware);
router.route('/:restaurantId')
    .get(restaurantsController.getRestaurant);

module.exports = router;

/**
 * @openapi
 * /restaurants:
 *   get:
 *     summary: Récupère tous les restaurants
 *     description: Récupère tous les restaurants, les informations sont différents si non-admin.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Restaurants
 *     responses:
 *       200:
 *         description: Retourne tous les restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 oneOf:
 *                   - $ref: '#/components/models/Restaurant'
 *                   - $ref: '#/components/schemas/Restaurant'
 *       401:
 *         description: Requiert une authentification
 * /restaurants/{restaurantId}:
 *   get:
 *     summary: Récupère les informations d'un seul restaurant
 *     description: Récupère les informations d'un seul restaurant, les informations sont différents si non-admin.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Restaurants
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: Identifiant du restaurant au format ObjectId.
 *     responses:
 *       200:
 *         description: Retourne les informations d'un seul restaurant
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/models/Restaurant'
 *                 - $ref: '#/components/schemas/Restaurant'
 *       401:
 *         description: Requiert une authentification
 */
