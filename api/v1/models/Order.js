const mongoose = require('mongoose');

const availableStatus = ['waiting_for_payment', 'pending', 'accepted', 'ready', 'delivering', 'delivered'];

const orderSchema = new mongoose.Schema({
    restaurant: {type: mongoose.Types.ObjectId, ref: 'Restaurant', required: true},
    menus: {type: [{type: mongoose.Types.ObjectId, ref: 'Menu'}], required: true},
    deliverer: {type: mongoose.Types.ObjectId, red: 'Deliverer', required: true},
    client: {type: mongoose.Types.ObjectId, red: 'Client', required: true},
    status: {
        type: String,
        enum: availableStatus,
        default: 'pending'
    },
    payment: {
        type: {
            credit_card: {
                type: {
                    number: {type: String, required: true},
                    expiration: {type: String, required: true},
                    ccv: {type: String, required: true}
                },
                required: true
            }
        },
        required: true
    }
});

/**
 * @alias Order.prototype.acceptPayment
 * @returns {Promise<string>} Retourne le statut de la commande
 */
orderSchema.methods.acceptPayment = async function () {
    if(this.status !== 'waiting_for_payment') {
        return this.updateStatus('pending');
    }
    return this.status;
}

/**
 * @alias Order.prototype.updateStatus
 * @returns {Promise<string>} Retourne le nouveau statut de la commande
 */
orderSchema.methods.updateStatus = async function () {
    const index = availableStatus.indexOf(this.status);
    if (index < 0 || index == availableStatus.length - 1) 
        return this.status;
    else {
        this.status = availableStatus[index + 1];
        console.log(availableStatus[index + 1])
        return this.save().then(order => order.status);
    }
}

/**
 * @class Order
 * @property {ObjectId|Restaurant} restaurant Restaurant qui doit faire la commande
 * @property {[ObjectId|Menu]} menus Menus achetés dans le restaurant
 * @property {ObjectId|Deliverer} deliverer Livreur assigné à la livraison de la commande
 * @property {ObjectId|Client} client Client ayant commandé
 * @property {'pending'|'preparing'|'ready'|'arriving'|'delivered'} status Statut de la commande
 * @property {{credit_card: {number: string, expiration: string, ccv: string}, status: string}} payment Infos sur le paiement
 */
module.exports = mongoose.model('Order', orderSchema);
