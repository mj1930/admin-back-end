const productSchema = require('../models/products/products');

const productValidator = require('../validators/products.validators');

module.exports = {

    listAllProduct: async (req, res, next) => {
        try {
            let allProducts = await productSchema.find({
                isDeleted: false
            }).lean();
            return res.json({
                code: 200,
                data: allProducts,
                message: "all product fetched successfully!!",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    approveProduct: async (req, res, next) => {
        try {
            let { productId, status, feedback } = await productValidator.approveProduct().validateAsync(req.body);
            let count = await productSchema.countDocuments({_id: productId});
            if (count) {
                let productData = await productSchema.findOneAndUpdate({
                    _id: productId
                }, {
                    $set: {
                        feedback,
                        isApproved: status
                    }
                }, {new: true}).lean();
                return res.json({
                    code: 200,
                    data: productData,
                    message: "Product status changed",
                    error: null
                });
            } else {
                return res.json({
                    code: 400,
                    data: {},
                    message: "No product found",
                    error: null
                });
            }
        } catch (err) {
            next(err);
        }
    }
}