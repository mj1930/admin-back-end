const Joi = require('@hapi/joi');

exports.addOrder = () => {
    return Joi.object().keys({
        mode: Joi.string().required().trim(),
        products: Joi.object().required(),
        userId: Joi.string().optional().trim(),
        totalAmnt: Joi.number().required(),
        address: Joi.string().required(),
        userGstin: Joi.string().optional(),
        businessName: Joi.string().optional(),
        paymentMode:  Joi.string().required().trim(),
        sellerId: Joi.string().optional().trim()
    });
};

exports.listOrders = () => {
    return Joi.object().keys({
        skip:  Joi.number().required(),
        limit: Joi.number().required()
    });
};

exports.filterOrders = () => {
    return Joi.object().keys({
        skip:  Joi.number().required(),
        limit: Joi.number().required(),
        status: Joi.string().required().trim()
    });
};

exports.updateOrder = () => {
    return Joi.object().keys({
        orderId: Joi.string().required().trim(),
        status: Joi.string().required().trim()
    });
};