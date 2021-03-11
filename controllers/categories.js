const categorySchema = require('../models/categories/categories');
const subCategorySchema = require('../models/categories/subCategories');

const categoryValidator = require('../validators/categories.validators');
const _ = require('underscore');
module.exports = {

    addCategorySubCategory: async (req, res, next) => {
        try {
            let { category, subCategory } = await categoryValidator.addCategory().validateAsync(req.body);
            let addCategoryData = await categorySchema.create({
                categoryName: category,
                status: true
            });
            let addSubcategory = await subCategorySchema.create({
                subCategoryName: subCategory,
                categoryId: addCategoryData._id,
                status: true
            });
            return res.json({
                code: 200,
                data: { addCategoryData, addSubcategory },
                message: "Added Category and subcategory successfully !!",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    addSubCategory: async (req, res, next) => {
        try {
            let { categoryId, subCategory } = await categoryValidator.addSubCategory().validateAsync(req.body);
            let addSubcategory = await subCategorySchema.create({
                subCategoryName: subCategory,
                categoryId,
                status: true
            });
            return res.json({
                code: 200,
                data: addSubcategory,
                message: "Added Category and subcategory successfully !!",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    listAllCategoriesSubCategories: async (req, res, next) => {
        try {
            let { skip, limit } = await categoryValidator.listCategoriesSubCategories().validateAsync(req.body);
            let categoriesData = await categorySchema.find({
                isDeleted: false
            })
            .skip(skip)
            .limit(limit)
            .lean();
            let dataArr = [];
            for (let i = 0; i < categoriesData.length; i++) {
                let category = categoriesData[i];
                let obj = {
                    category: category.categoryName,
                    subCategories: []
                };
                let subCategoriesData = await subCategorySchema.find({
                    categoryId: category._id,
                    isDeleted: false
                }).lean();
                let names = _.pluck(subCategoriesData, 'subCategoryName');
                obj.subCategories = names;
                dataArr.push(obj);
            };
            return res.json({
                code: 200,
                data: dataArr,
                message: "Categories and sub categories fetched successfully",
                error: null
            });
        } catch (err) {
            next(err);
        }
    }
}