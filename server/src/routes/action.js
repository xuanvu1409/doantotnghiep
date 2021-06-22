const express = require('express');
const router = express.Router();
const encounterController = require("../app/controllers/EncounterController");
const auth = require('../app/middleware/auth');

router.post('/like/', auth, encounterController.like);

module.exports = router;