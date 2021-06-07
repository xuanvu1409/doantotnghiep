const express = require('express');
const router = express.Router();
const profileController = require("../app/controllers/ProfileController");
const auth = require('../app/middleware/auth');

router.get('/get-all', auth, profileController.getJobTile);

module.exports = router;
