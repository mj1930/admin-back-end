const orderSchema = require('../models/orders/orders');

const orderValidator = require('../validators/orders.validators');

module.exports = {

    addOrder: async (req, res, next) => {
        try {
            let { mode, products, userId, totalAmnt, sellerId,
                address, userGstin, businessName, paymentMode } = await orderValidator.addOrder().validateAsync(req.body);
            let orderData = await orderSchema.create({
                mode,
                products,
                userId,
                sellerId,
                totalAmnt,
                address,
                userGstin,
                businessName,
                paymentMode
            });
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
    }
}