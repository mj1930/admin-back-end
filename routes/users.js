const router = require('express').Router();
const userCtrl = require('../controllers/users');
const { authorize } = require('../middleware/auth');

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.post('/get-all-users', authorize, userCtrl.listAllUsers);
router.post('/get-all-customers', authorize, userCtrl.listAllCustomers);
router.get('/get-user-details', authorize, userCtrl.getUserData);
router.post('/sort-user', authorize, userCtrl.sortUser);
router.post('/search-user', authorize, userCtrl.searchUser);
router.post('/approve-disapprove-customer', authorize, userCtrl.approveDisapproveCustomer);
router.post('/approve-disapprove-seller', authorize, userCtrl.approveDisapproveSeller);

module.exports = router;