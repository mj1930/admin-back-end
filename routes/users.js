const router = require('express').Router();
const userCtrl = require('../controllers/users');
const { authorize } = require('../middleware/auth');

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.post('/get-all-users', authorize, userCtrl.listAllUsers);
router.get('/get-user-details', authorize, userCtrl.getUserData);

module.exports = router;