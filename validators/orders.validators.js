const Joi = require('@hapi/joi');

exports.addOrder = () => {
    return Joi.object().keys({
        mode: Joi.string().required().trim(),
        products: Joi.object().required(),
        userId: Joi.string().allow('').optional(),
        totalAmnt: Joi.number().required(),
        address: Joi.string().required(),
        userGstin: Joi.string().allow('').optional(),
        businessName: Joi.string().allow('').optional(),
        paymentMode:  Joi.string().required().trim(),
        sellerId: Joi.string().allow('').optional()
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