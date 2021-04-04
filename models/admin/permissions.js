const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'adminUser'
    },
    userName: {
        type: String,
        default: ""
    },
    permissions: {
        type: Array,
        default: []
    }
}, { timestamps: true });

const Permissions = mongoose.model('permissions', permissionSchema);

module.exports = Permissions;