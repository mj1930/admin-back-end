const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'sellers'
    },
    storename: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const Stores = mongoose.model('storenames', StoreSchema);

module.exports = Stores;