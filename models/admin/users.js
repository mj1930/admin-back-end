const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    mobile: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const adminUsers = mongoose.model('adminUser', UserSchema);

module.exports = adminUsers;