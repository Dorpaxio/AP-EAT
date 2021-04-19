/**
 * @class APEatError
 * @property statusCode {number} Code d'erreur HTTP correspondant à l'erreur
 * @property code {string} Code d'erreur customisé pour identifier l'erreur
 * @property message {string} Message d'erreur renvoyé
 */
module.exports = class APEatError extends Error {
    constructor(statusCode, code, message) {
        super();
        this.message = message;
        this.statusCode = statusCode || 500;
        this.code = code;
    }
}
