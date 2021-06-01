const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');
const homeController = require('../app/controllers/HomeController');
const auth = require('../app/middleware/auth');
const profileController = require('../app/controllers/ProfileController');
const uploadMulter = require('../app/middleware/upload');
const validation = require('../app/middleware/validation');

router.post('/profile/upload-avatar', uploadMulter, validation, profileController.uploadAvatar);
router.post('/profile/update-work-and-education', auth, profileController.updateWordAndEducation);
router.post('/profile/update-location', auth, profileController.updateLocation);
router.post('/profile/update-interests', auth, profileController.updateInterests);
router.post('/profile/update-language', auth, profileController.updateLanguage);
router.get('/profile/:profileId', auth, profileController.getMemberByProfileId);
router.get('/profile/get/:_id', auth, profileController.getMemberById);
router.post('/register' , authController.register);
router.post('/login', authController.login);
router.get('/', homeController.get);
router.post('/profile/upload-image', auth, profileController.uploadImage);

module.exports = router;
