const orderSchema = require('../models/orders/orders');
const productSchema = require('../models/products/products');
const sellerSchema = require('../models/users/users');
const userSchema = require('../models/customers/users');

const orderValidator = require('../validators/orders.validators');
const crypto = require('../utils/crypto/Crypto');

const _ = require('underscore');

module.exports = {

    addOrder: async (req, res, next) => {
        try {
            let { mode, products, userId, totalAmnt,
                address, userGstin, businessName, paymentMode } = await orderValidator.addOrder().validateAsync(req.body);
            let orderData = await orderSchema.create({
                mode,
                products,
                userId,
                totalAmnt,
                address,
                userGstin,
                businessName,
                paymentMode
            });
            for (let i = 0; i < products.length;i++) {
                let product = products[i];
                await productSchema.updateOne({
                    _id: product.productId
                }, {
                    $inc: {
                        availableUnits: -parseInt(product.quantity)
                    },
                    $set:{
                        soldUnits: parseInt(product.quantity)
                    }
                });
            }
            return res.json({
                code: 200,
                data: orderData,
                message: 'Order placed successfully',
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    listOrders: async (req, res, next) => {
        try {
            let { skip, limit } = await orderValidator.listOrders().validateAsync(req.body);
            let orders = await orderSchema.find({})
                .skip(skip)
                .limit(limit)
                .sort({
                    createdAt: -1
                })
                .lean();
            return res.json({
                code: 200,
                data: orders,
                message: "Orders list fetched",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    filterProducts: async (req, res, next) => {
        try {
            let { skip, limit, status, search } = await orderValidator.filterOrders().validateAsync(req.body);
            let orders = [];
            if (search) {
                orders = await orderSchema.find({
                    $and: [
                        {
                            orderStatus: status
                        },
                        {
                            paymentMode: { $regex: new RegExp(search, 'i') }
                        }
                    ]
                })
                    .skip(skip)
                    .limit(limit)
                    .lean();
            } else {
                orders = await orderSchema.find({
                    orderStatus: status
                })
                    .skip(skip)
                    .limit(limit)
                    .lean();
            }
            return res.json({
                code: 200,
                data: orders,
                message: "Orders list fetched",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    updateOrderStatus: async (req, res, next) => {
        try {
            let { orderId, status } = await orderValidator.updateOrder().validateAsync(req.body);
            let orders = await orderSchema.findOneAndUpdate({
                _id: orderId
            }, {
                $set: {
                    orderStatus: status
                }
            }, { new: true }).lean();
            return res.json({
                code: 200,
                data: orders,
                message: "Orders list fetched",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    sortOrder: async (req, res, next) => {
        try {
            let { key, sortBy, skip, limit } = await orderValidator.sortOrder().validateAsync(req.body);
            let query = {};
            query[key] = sortBy;
            let products = await orderSchema.find({})
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
    },

    searchOrdersByTerm: async (req, res, next) => {
        try {
            const { skip, limit, search, status } = await orderValidator.searchOrders().validateAsync(req.body);
            let productDetails = [];
            if (status) {
                productDetails = await orderSchema.find({
                    $and: [
                        {
                            orderStatus: status
                        },
                        {
                            paymentMode: { $regex: new RegExp(search, 'i') }
                        }
                    ]
                }).sort({
                    createdAt: -1
                }).skip(skip)
                    .limit(limit)
                    .lean()
            } else {
                productDetails = await orderSchema.find({
                    $and: [
                        {
                            paymentMode: { $regex: new RegExp(search, 'i') }
                        }
                    ]
                }).sort({
                    createdAt: -1
                }).skip(skip)
                    .limit(limit)
                    .lean()
            }
            return res.send({
                code: 200,
                data: productDetails,
                message: "Searched list with all possibility",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    searchOrdersByOrderId: async (req, res, next) => {
        try {
            const { skip, limit, orderId } = await orderValidator.searchOrdersById().validateAsync(req.body);
            let productDetails = await orderSchema.find({
                $and: [
                    {
                        _id: orderId
                    }
                ]
            }).sort({
                createdAt: -1
            }).skip(skip)
                .limit(limit)
                .lean()
            return res.send({
                code: 200,
                data: productDetails,
                message: "Searched list with all possibility",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    orderStatusFindOne: async (req, res, next) => {
        try {
            let id = req.params.id;
            let orders = await orderSchema.findOne({
                $and: [
                    {
                        _id: id
                    }
                ]
            })
            return res.json({
                code: 200,
                data: orders,
                message: "Order data fetched",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    printInvoice: async (req, res, next) => {
        try {
            let id = req.params.id;
            let orders = await orderSchema.findOne({
                $and: [
                    {
                        _id: id
                    }
                ]
            }).lean();
            let sellerIds = orders?.products?.length ? _.map(orders.products, 'sellerId') : [];
            let sellerData = await sellerSchema.find({
                _id : { $in : sellerIds }
            }, { address: 1, name: 1, gstin: 1, pan: 1}).lean();
            for (let i = 0; i < sellerData.length;i++) {
                let pan = sellerData[i].pan ? await crypto.staticDecrypter(sellerData[i].pan) : '';
                let gstin = sellerData[i].gstin ? await crypto.staticDecrypter(sellerData[i].gstin) : '';
                sellerData[i]['pan'] = pan;
                sellerData[i]['gstin'] = gstin;
            }
            orders['sellerDetails'] = sellerData;
            return res.json({
                code: 200,
                data: orders,
                message: "",
                error: null
            });
        } catch (err) {
            next(err);
        }
    }

}