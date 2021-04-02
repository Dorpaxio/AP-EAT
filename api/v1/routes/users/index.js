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
 *     description: Requiert une connexion, récupère les informations de l'utilisateur courrant.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *       - Utilisateur courrant
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
 *     description: Requiert une connexion, récupère les informations de l'utilisateur courrant.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Utilisateur courrant
 *     responses:
 *       200:
 *         description: Retourne le panier de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Requiert une authentification
 */
