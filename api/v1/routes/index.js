const router = require('express').Router();
const isLogged = require('../controllers/AuthController').checkToken;

router.use('/auth', require('./auth'));
router.use('/carts', isLogged, require('./carts'));
router.use('/restaurants', isLogged, require('./restaurants'));
router.use('/users', isLogged, require('./users'));

module.exports = router;

/**
 * @openapi
 * components:
 *   responses:
 *     UnauthorizedError:
 *       description: Le bearer token n'est pas valide ou manquant.
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   models:
 *     Restaurant:
 *       description: Un utilisateur est une personne enregistrée, c'est le parent de Client, Restaurant et Deliverer.
 *       type: object
 *       properties:
 *         restaurant_name:
 *           type: string
 *           description: Nom du restaurant
 *         menus:
 *           type: array
 *           description: Menus proposés par le restaurant
 *           items:
 *             $ref: '#/components/schemas/Menu'
 *         address:
 *           $ref: '#/components/schemas/Address'
 *   schemas:
 *     Address:
 *       description: Addresse
 *       type: object
 *       properties:
 *         street:
 *           type: string
 *           description: Numéro de rue et rue de l'utilisateur.
 *         additional:
 *           type: string
 *           description: Addresse complémentaire (batiment, ...)
 *         city:
 *           type: string
 *           description: Ville de l'utilisateur.
 *         zip:
 *           type: string
 *           description: Code postal de l'utilisateur.
 *         country:
 *           type: string
 *           description: Pays de l'utilisateur.
 *     User:
 *       description: Un utilisateur est une personne enregistrée, c'est le parent de Client, Restaurant et Deliverer.
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: Type de l'utilisateur (deliverer,client,restaurant)
 *           example: restaurant|client|deliverer
 *         first_name:
 *           type: string
 *           description: Prénom de l'utilisateur.
 *         last_name:
 *           type: string
 *           description: Nom de famille de l'utilisateur.
 *         email:
 *           type: string
 *           description: Email de l'utilisateur.
 *         phone:
 *           type: string
 *           description: Téléphone au format français de l'utilisateur.
 *         address:
 *           $ref: '#/components/schemas/Address'
 *     Client:
 *       description: Un client est un utilisateur qui commande à manger.
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *     Deliverer:
 *       description: Un livreur est un utilisateur qui livre à manger.
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *     Restaurant:
 *       description: Un restaurant est un utilisateur avec des informations sur son restaurant.
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *         - $ref: '#/components/models/Restaurant'
 *         - type: object
 *           properties:
 *             products:
 *               type: array
 *               description: Produits enregistrés par le restaurant (visible que par le restaurant)
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *     Product:
 *       description: Un produit est défini par un restaurant, visible que par lui.
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         img_url:
 *           type: string
 *         type:
 *           type: string
 *         extras:
 *           type: array
 *           description: Liste de produits possibles à ajouter en extra.
 *           items:
 *             type: string
 *             format: ObjectId
 *     Menu:
 *       description: Un menu est un ensemble de produits, les menus sont visibles par les clients. Un menu peut avoir un seul ou plusieurs produits.
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         img_url:
 *           type: string
 *         category:
 *           type: string
 *         products:
 *           type: array
 *           description: Liste de produits contenus dans le menu.
 *           items:
 *             $ref: '#/components/schemas/Product'
 *     Cart:
 *       description: Pannier d'un client lors de sa commande.
 *       type: object
 *       properties:
 *         restaurant:
 *           type: string
 *           format: ObjectId
 *         client:
 *           type: string
 *           format: ObjectId
 *         menus:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Menu'
 *       example:
 *         restaurant: 606348400fc4ebaa7fee30c3
 *         client: 606348400fc4ebga7fee43d2
 *         menus:
 *           - name: Burger XXL + Frites
 *             description: Un super burger et des frites
 *             img_url: https://example.com/image.jpg
 *             category: Burgers
 *             products:
 *               - name: Burger XXL
 *                 description: Un super burger
 *                 img_url: https://example.com/image.jpg
 *                 type: burger
 *                 extras: []
 *               - name: Frites
 *                 description: Des supers frites
 *                 type: frites
 *                 extras: []
 */
