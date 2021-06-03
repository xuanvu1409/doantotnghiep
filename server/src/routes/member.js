const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');
const homeController = require('../app/controllers/HomeController');
const auth = require('../app/middleware/auth');
const profileController = require('../app/controllers/ProfileController');
const uploadSingle = require('../config/uploadSingleFile');
const uploadMultiple = require('../config/uploadMultipleFile');

router.post('/profile/upload-avatar', uploadSingle, profileController.uploadAvatar);
router.post('/profile/update-work-and-education', auth, profileController.updateWordAndEducation);
router.post('/profile/update-location', auth, profileController.updateLocation);
router.post('/profile/update-interests', auth, profileController.updateInterests);
router.post('/profile/update-language', auth, profileController.updateLanguage);
router.get('/profile/:profileId', auth, profileController.getMemberByProfileId);
router.get('/profile/get/:_id', auth, profileController.getMemberById);
router.post('/register' , authController.register);
router.post('/login', authController.login);
router.post('/profile/upload-image', uploadMultiple, profileController.uploadImage);
router.get('/profile/get-gallery/:_id', auth, profileController.getGallery);
router.delete('/profile/remove-image/:_id', auth, profileController.removeImageById);
router.get('/', homeController.get);

module.exports = router;
