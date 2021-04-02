const router = require('express').Router();
const isAdmin = require('../../middlewares/AdminMiddleware');
const usersController = require('../../controllers/UsersController');

router.route('/')
    .get(isAdmin, usersController.getUsers);

router.use('/me', require('./me'));

module.exports = router;

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Récupère tous les utilisateurs (Admin)
 *     description: Récupère tous les utilisateurs **Admin**
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Retourne tous les utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Requiert une authentification
 *       403:
 *         description: N'est pas administateur (**AD40300**)
 * /users/me:
 *   get:
 *     summary: Récupère les informations sur soi-même
 *     description: Requiert une connexion, récupère les informations de l'utilisateur courant.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *       - Utilisateur courant
 *     responses:
 *       200:
 *         description: Retourne tous les utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/Client'
 *                 - $ref: '#/components/schemas/Deliverer'
 *                 - $ref: '#/components/schemas/Restaurant'
 *                   description: Si c'est un restaurant
 *       401:
 *         description: Requiert une authentification
 * /users/me/cart:
 *   get:
 *     summary: Récupère le panier du client
 *     description: Requiert une connexion, récupère les informations de l'utilisateur courant.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Utilisateur courant
 *     responses:
 *       200:
 *         description: Retourne le panier de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Requiert une authentification
 *   post:
 *     summary: Ajoute un menu au panier.
 *     description: Ajoute un menu au panier du client courant.
 *                  Les menus doivent appartenir au même restaurant.
 *                  Si un menu est déjà dans le panier, il est quand même ajouté,
 *                  pour récupérer la quantité il faut donc faire la somme des éléments de même ID.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Utilisateur courant
 *     requestBody:
 *       description: Menu et restaurant à rajouter au panier.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               menu:
 *                 type: string
 *                 format: ObjectId
 *                 example: MenuId
 *               restaurant:
 *                 type: string
 *                 format: ObjectId
 *                 example: RestaurantId
 *     response:
 *       201:
 *         description: Le menu a été rajouté au panier du client.
 *       400:
 *         description: Un des champs n'est pas correctement formaté ou manquant.
 *       401:
 *         description: Requiert une authentification
 */
