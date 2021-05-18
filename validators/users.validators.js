const Joi = require("@hapi/joi");

exports.login = () => {
    return Joi.object().keys({
        email: Joi.string().required().trim(),
        password: Joi.string().required().trim()
    });
};

exports.signup = () => {
    return Joi.object().keys({
        name: Joi.string().required().trim(),
        password: Joi.string().required().trim(),
        email: Joi.string().email().required().trim(),
        phone: Joi.string().required().trim()
    });
};

exports.listAllUsers = () => {
    return Joi.object().keys({
        skip: Joi.number().required(),
        limit: Joi.number().required(),
        status: Joi.string().optional()
    });
}

exports.listAllCustomers = () => {
    return Joi.object().keys({
        skip: Joi.number().required(),
        limit: Joi.number().required()
    });
}

exports.approveCustomers = () => {
    return Joi.object().keys({
        customerId: Joi.string().required().trim(),
        status: Joi.boolean().required()
    });
}

exports.approveSeller = () => {
    return Joi.object().keys({
        sellerId: Joi.string().required().trim(),
        status: Joi.boolean().required()
    });
}

exports.approveAdminUser = () => {
    return Joi.object().keys({
        userId: Joi.string().required().trim(),
        status: Joi.boolean().required()
    });
}

exports.sortUser = () => {
    return Joi.object().keys({
        key: Joi.string().required().trim(),
        sortBy: Joi.number().required(),
        skip: Joi.number().required(),
        limit: Joi.number().required()
    });
};

exports.searchUser = () => {
    return Joi.object().keys({
        skip: Joi.number().required(),
        limit: Joi.number().required(),
        search: Joi.string().optional()
    });
}