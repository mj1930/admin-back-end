const categorySchema = require('../models/categories/categories');
const subCategorySchema = require('../models/categories/subCategories');

const categoryValidator = require('../validators/categories.validators');
module.exports = {

    addCategorySubCategory: async (req, res, next) => {
        try {
            let img = req.file ? req.file.location: "";
            console.log(req.file)
            let { category, subCategory } = await categoryValidator.addCategory().validateAsync(req.body);
            let addCategoryData = await categorySchema.create({
                categoryName: category,
                img,
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
                message: "Added Subcategory successfully !!",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    listAllCategories: async (req, res, next) => {
        try {
            let { skip, limit } = await categoryValidator.listCategories().validateAsync(req.body);
            let categoriesData = await categorySchema.find({
                isDeleted: false
            })
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
            .lean();
            return res.json({
                code: 200,
                data: categoriesData,
                message: "Categories fetched successfully",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    listAllSubCategories: async (req, res, next) => {
        try {
            let { skip, limit, categoryId } = await categoryValidator.listSubcategories().validateAsync(req.body);
            let subCategoriesData = await subCategorySchema.find({
                categoryId,
                isDeleted: false
            })
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
            .lean();
            return res.json({
                code: 200,
                data: subCategoriesData,
                message: "Sub categories fetched successfully",
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
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
            .lean();
            let dataArr = [];
            for (let i = 0; i < categoriesData.length; i++) {
                let category = categoriesData[i];
                let obj = {
                    category: category.categoryName,
                    categoryId: category._id,
                    status: category.status,
                    subCategories: []
                };
                let subCategoriesData = await subCategorySchema.find({
                    categoryId: category._id,
                    isDeleted: false
                }, {_id: 1, subCategoryName: 1}).lean();
                obj.subCategories = subCategoriesData;
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
    },

    sortUser: async (req, res, next) => {
        try {
            let { key, sortBy, skip, limit } = await categoryValidator.sortCategory().validateAsync(req.body);
            let query = {};
            query[key] = sortBy;
            let products = await categoryValidator.find({})
            .sort(query)
            .skip(skip)
            .limit(limit)
            .lean();
            return res.json({
                code: 200,
                data: products,
                message: "Sorted List",
                error: null
            });
        } catch (err) {
            next(err);
        }
    }
}