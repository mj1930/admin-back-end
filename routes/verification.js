const router = require('express').Router();
const verficationCtrl = require('../controllers/verification');
const { authorize } = require('../middleware/auth');

router.post('/send-email-verification', verficationCtrl.sendEmailVerification);
router.post('/send-email-verification',authorize, verficationCtrl.verifyEmail);

module.exports = router;