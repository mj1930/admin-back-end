const Joi = require('@hapi/joi');

exports.addPermission = () => {
    return Joi.object().keys({
        userId: Joi.string().required().trim(),
        permission: Joi.string().required().trim()
    });
};

exports.removePermission = () => {
    return Joi.object().keys({
        userId: Joi.string().required().trim(),
        permission: Joi.string().required().trim()
    });
};

exports.listPermissionOneUser = () => {
    return Joi.object().keys({
        userId: Joi.string().required().trim()
    });
};

exports.listAllPermission = () => {
    return Joi.object().keys({
        skip: Joi.number().required(),
        limit: Joi.number().required()
    });
}