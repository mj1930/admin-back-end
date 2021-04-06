const router = require('express').Router();
const permissionCtrl = require('../controllers/permissions');
const auth = require('../middleware/auth');
const { authAdmin } = require('../middleware/auth');

router.post('/add-permission', authAdmin, permissionCtrl.addPermission);
router.post('/remove-permission', authAdmin, permissionCtrl.removePermission);
router.post('/list-all-permission', authAdmin, permissionCtrl.getAllPermission);
router.get('/list-user-permission', permissionCtrl.getPermissionForOneUser);

module.exports = router;