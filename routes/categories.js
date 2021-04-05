const router = require('express').Router();
const categoryCtrl = require('../controllers/categories');
const { upload } = require('../helpers/file-upload');

router.post('/add-category', upload.single('file', 1), categoryCtrl.addCategorySubCategory);
router.post('/add-subcategory', categoryCtrl.addSubCategory);
router.post('/get-all-categories', categoryCtrl.listAllCategories);
router.post('/get-all-subcategories', categoryCtrl.listAllSubCategories);
router.post('/get-all', categoryCtrl.listAllCategoriesSubCategories);

module.exports = router;