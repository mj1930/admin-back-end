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
        email: Joi.string().email().required().trim()
    });
};

exports.listAllUsers = () => {
    return Joi.object().keys({
        skip: Joi.number().required(),
        limit: Joi.number().required(),
        status: Joi.string().optional()
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