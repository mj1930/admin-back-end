const router = require('express').Router();
const productCtrl = require('../controllers/products');

router.get('/get-all-products', productCtrl.listAllProduct);
router.post('/approve-disapprove-product', productCtrl.approveProduct);
router.post('/filter-products', productCtrl.filterProducts);

module.exports = router;