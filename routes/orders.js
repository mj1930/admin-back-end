const router = require('express').Router();
const orderCtrl = require('../controllers/orders');
const paymentCtrl = require('../controllers/payment');

router.post('/add-order', orderCtrl.addOrder);
router.post('/list-orders', orderCtrl.listOrders);
router.post('/filter-orders', orderCtrl.filterProducts);
router.post('/update-order', orderCtrl.updateOrderStatus);
router.post('/sort-order', orderCtrl.sortOrder);
router.get('/get-order/:id', orderCtrl.orderStatusFindOne);
router.post('/search-product', orderCtrl.searchOrdersByTerm);
router.post('/search-product-id', orderCtrl.searchOrdersByOrderId);
router.get('/get-payments', paymentCtrl.listAllPayments);
router.get('/print-invoice/:id', orderCtrl.printInvoice);
router.post('/search-payments', paymentCtrl.searchByOrderId);

module.exports = router;