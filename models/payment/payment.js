const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    mode: {
        type: String,
        default: "website"
    },
    paymentResult: [{}],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        default:null
    }

}, {timestamps: true});

const Payment = mongoose.model('payment',  paymentSchema);

module.exports = Payment;