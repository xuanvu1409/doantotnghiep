const express = require('express');
const router = express.Router();
const profileController = require("../app/controllers/ProfileController");

router.get('/get-all', profileController.getJobTile);

module.exports = router;
