const paymentSchema = require('../models/payment/payment');

module.exports = {

    listAllPayments: async(req, res, next) => {
        try {
            let payment = await paymentSchema.find().sort({ createdAt: -1}).lean();
            return res.json({
                code: 200,
                data: payment,
                message: "",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    searchByOrderId: async (req, res, next) => {
        try {
            let orderId = req.body.id;
            let paymentData = await paymentSchema.findOne({
                "paymentResult.ORDERID": orderId
            }).lean();
            return res.json({
                code: 200,
                data: paymentData,
                message: "",
                error: null
            })
        } catch(err) {
            next(err);
        }
    }
}