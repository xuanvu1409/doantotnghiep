const express = require('express');
const router = express.Router();
const profileController = require("../app/controllers/ProfileController");
const auth = require('../app/middleware/auth');

router.get('/get-contact/', auth, profileController.getContactByMemberId);

module.exports = router;
