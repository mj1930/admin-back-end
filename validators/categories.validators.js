const Joi = require('@hapi/joi');

exports.addCategory = () => {
    return Joi.object().keys({
        category: Joi.string().required().trim(),
        subCategory: Joi.string().required().trim()
    });
};

exports.addSubCategory = () => {
    return Joi.object().keys({
        categoryId: Joi.string().required().trim(),
        subCategory: Joi.string().required().trim()
    });
};

exports.listCategories = () => {
    return Joi.object().keys({
        skip: Joi.number().required(),
        limit: Joi.number().required()
    });
};

exports.listSubcategories = () => {
    return Joi.object().keys({
        skip: Joi.number().required(),
        limit: Joi.number().required(),
        categoryId: Joi.string().required().trim()
    });
};

exports.approveCategories = () => {
    return Joi.object().keys({
        categoryId: Joi.string().required().trim(),
        status: Joi.boolean().required()
    });
}

exports.listCategoriesSubCategories = () => {
    return Joi.object().keys({
        skip: Joi.number().required(),
        limit: Joi.number().required()
    });
}

exports.sortCategory = () => {
    return Joi.object().keys({
        key: Joi.string().required().trim(),
        sortBy: Joi.number().required(),
        skip: Joi.number().required(),
        limit: Joi.number().required()
    });
};