const router = require('express').Router();
const productCtrl = require('../controllers/products');

router.get('/get-all-products', productCtrl.listAllProduct);
router.post('/approve-disapprove-product', productCtrl.approveProduct);
router.post('/filter-products', productCtrl.filterProducts);
router.get('/search-products', productCtrl.searchFromProducts);
router.get('/get-product-details/:productId', productCtrl.getProductDetails);
router.post('/sort-products', productCtrl.sortProduct);

module.exports = router;