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

    filterProducts: async (req, res, next) => {
        try {
            let allProducts = [];
            let { skip, limit, status } = await productValidator.filterProducts().validateAsync(req.body);
            allProducts = await productSchema.find({
                isDeleted: false,
                isApproved: status
            })
            .skip(skip)
            .limit(limit)
            .lean();
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

    searchFromProducts: async (req, res, next) => {
        try {
            let { term } = await productValidator.searchProduct().validateAsync(req.query);
            let searchedProducts = await productSchema.find({
                $or: [
                    {itemName: { $regex: new RegExp(term, 'i') }},
                    { barcode:  { $regex: new RegExp(term, 'i') }}
                ]
            }).lean();
            if (searchedProducts && searchedProducts.length > 0) {
                return res.json({
                    code: 200,
                    data: searchedProducts,
                    message: "all product fetched successfully!!",
                    error: null
                });
            } else {
                return res.json({
                    code: 400,
                    data: {},
                    message: "No products found !!",
                    error: null
                });
            }
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
    },

    getProductDetails: async (req, res, next) => {
        try {
            let { productId } = await productValidator.getProductDetails().validateAsync(req.params);
            let productData = await productSchema.findOne({
                _id: productId
            }).lean();
            return res.json({
                code: 200,
                data: productData,
                message: "Product data found",
                error: null
            });
        } catch(err) {
            next(err);
        }
    },

    sortProduct: async (req, res, next) => {
        try {
            let { key, sortBy, skip, limit } = await productValidator.sortProducts().validateAsync(req.body);
            let query = {};
            query[key] = sortBy;
            let products = await productSchema.find({
                isApproved: true
            })
            .sort(query)
            .skip(skip)
            .limit(limit)
            .lean();
            return res.json({
                code: 200,
                data: products,
                message: "Sorted List",
                error: null
            });
        } catch (err) {
            next(err);
        }
    }
}