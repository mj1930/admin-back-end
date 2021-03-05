const Joi = require("@hapi/joi");

exports.addProduct = () => {
    return Joi.object().keys({
        productId: Joi.string().required().trim(),
        status: Joi.string().required().trim(),
        feedback: Joi.string().required().trim()
    });
}