const mongoose = require('mongoose');
const orderSchema = require('../models/orders/orders');
const productSchema = require('../models/products/products');

const orderValidator = require('../validators/orders.validators');
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
            // for (let i = 0; i < products.length;i++) {
                await productSchema.updateOne({
                    _id: products.productId
                }, {
                    $inc: {
                        availableUnits : -products.quantity
                    }
                });
            // }
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
            let { skip, limit, status } = await orderValidator.filterOrders().validateAsync(req.body);
            let orders = await orderSchema.find({
                orderStatus: status
            })
            .skip(skip)
            .limit(limit)
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

    updateOrderStatus: async (req, res, next) => {
        try {
            let { orderId, status } = await orderValidator.updateOrder().validateAsync(req.body);
            let orders = await orderSchema.findOneAndUpdate({
                _id: orderId
            }, {
                $set: {
                    orderStatus: status  
                }
            }, { new : true}).lean();
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

    searchProductsByTerm: async(req, res, next) => {
        try {
            const { skip, limit, search, status } = await orderValidator.searchOrders().validateAsync(req.body);
            let productDetails = await orderSchema.find({
                $or: [
                    {
                        status
                    },
                    {
                        paymentMode: { $regex: new RegExp(search, 'i') }
                    }
                ]
            }).sort({
                createdAt: -1
            })
            .skip(skip)
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
    }
}