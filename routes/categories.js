const router = require('express').Router();
const categoryCtrl = require('../controllers/categories');

router.post('/add-category', categoryCtrl.addCategorySubCategory);
router.post('/add-subcategory', categoryCtrl.addSubCategory);
router.post('/get-all-categories', categoryCtrl.listAllCategoriesSubCategories);

module.exports = router;