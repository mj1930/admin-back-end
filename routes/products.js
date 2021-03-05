const router = require('express').Router();
const productCtrl = require('../controllers/products');
const { authorize } = require('../middleware/auth');

router.get('/get-all-products', authorize, productCtrl.listAllProduct);
router.post('/approve-disapprove-product', authorize, productCtrl.approveProduct);
module.exports = router;