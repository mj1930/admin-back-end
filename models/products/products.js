const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    barcode: {
        type: String,
        default: ""
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    itemName: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    countryOfOrigin: {
        type: String,
        default: ""
    },
    brand: {
        type: String,
        default: ""
    },
    modelNumber: {
        type: String,
        default: ""
    },
    dimensions: {
        type: String,
        default: ""
    },
    weight: {
        type: String,
        default: ""
    },
    color: {
        type: String,
        default: ""
    },
    size: {
        type: String,
        default: ""
    },
    productPrice: {
        type: String,
        default: ""
    },
    unitCount: {
        type: String,
        default: ""
    },
    mrp: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'subCategory'
    },
    heading: {
        type: String,
        default: ""
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    feedback: {
        type: String,
        default: ""
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true});

productSchema.index({ itemName: 1 });
productSchema.index({ barcode: 1 });

const Products = mongoose.model('products', productSchema);

module.exports = Products;