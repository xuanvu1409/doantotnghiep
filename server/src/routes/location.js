const express = require('express');
const router = express.Router();
const homeController = require("../app/controllers/HomeController");

router.get('/get-all', homeController.getLocation);

module.exports = router;
