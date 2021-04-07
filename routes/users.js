const router = require('express').Router();
const userCtrl = require('../controllers/users');
const { authorize } = require('../middleware/auth');

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.post('/get-all-users', userCtrl.listAllUsers);
router.get('/get-user-details', userCtrl.getUserData);
router.post('/sort-user', userCtrl.sortUser);

module.exports = router;