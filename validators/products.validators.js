const Joi = require("@hapi/joi");

exports.approveProduct = () => {
    return Joi.object().keys({
        productId: Joi.string().required().trim(),
        status: Joi.boolean().required(),
        //feedback: Joi.string().optional()
    });
}