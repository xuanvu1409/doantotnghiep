const express = require('express');
const router = express.Router();
const profileController = require("../app/controllers/ProfileController");

router.get('/get-all', profileController.getInterests);

module.exports = router;