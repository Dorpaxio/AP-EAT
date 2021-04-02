const router = require('express').Router();
const authController = require('../../controllers/AuthController');
const {body} = require('express-validator');

router.route('/')
    .all(body('email').not().isEmpty().isEmail().normalizeEmail(),
        body('password').not().isEmpty().isLength({min: 8}))
    .post(authController.login)
    .put(body('first_name').not().isEmpty().trim().escape(),
        body('last_name').not().isEmpty().trim().escape(),
        body('phone').not().isEmpty().isMobilePhone('fr-FR'),
        body('address.street').not().isEmpty().trim().escape(),
        body('address.additional').trim().escape(),
        body('address.city').not().isEmpty().trim().escape(),
        body('address.country').not().isEmpty().trim().escape(),
        body('address.zip').not().isEmpty().isPostalCode('FR'),
        authController.register);

module.exports = router;

/**
 * @openapi
 * /auth:
 *   post:
 *     summary: Connexion d'un utilisateur.
 *     description: Connexion d'un utilisateur à partir de son email et son mot de passe.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: Email et mot de passe de l'utilisateur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Retourne les informations sur l'utilisateur et le bearer token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                   format: bearer
 *                 expires:
 *                   type: number
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Mauvais mot de passe ou email (**AU40401**)
 *   put:
 *     summary: Inscription d'un utilisateur.
 *     description: Inscription d'un utilisateur.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: Informations sur l'utilisateur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/User'
 *               - type: object
 *                 properties:
 *                   password:
 *                     type: string
 *                     format: password
 *                     minLength: 8
 *                   restaurant_name:
 *                     type: string
 *                     description: Seulement si c'est un restaurant
 *     responses:
 *       200:
 *         description: Retourne les informations sur l'utilisateur et le bearer token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                   format: bearer
 *                 expires:
 *                   type: number
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Les champs ne sont pas biens remplis
 *       409:
 *         description: L'addresse email est déjà utilisée (**AU40900**)
 */
