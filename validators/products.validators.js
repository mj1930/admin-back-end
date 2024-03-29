const Joi = require("@hapi/joi");

exports.approveProduct = () => {
    return Joi.object().keys({
        productId: Joi.string().required().trim(),
        status: Joi.boolean().required(),
        feedback: Joi.string().allow('').optional()
    });
}

exports.listAllProducts = () => {
    return Joi.object().keys({
        skip: Joi.number().required(),
        limit: Joi.number().required()
    });
}

exports.filterOrders = () => {
    return Joi.object().keys({
        skip: Joi.number().required(),
        limit: Joi.number().required(),
        status: Joi.boolean().required(),
    });
};

exports.searchProduct = () => {
    return Joi.object().keys({
        term: Joi.string().required().trim()
    });
};

exports.getProductDetails = () => {
    return Joi.object().keys({
        productId: Joi.string().required().trim()
    });
};

exports.sortProducts = () => {
    return Joi.object().keys({
        key: Joi.string().required().trim(),
        sortBy: Joi.number().required(),
        skip: Joi.number().required(),
        limit: Joi.number().required()
    });
};