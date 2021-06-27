const express = require('express');
const router = express.Router();
const messageController = require("../app/controllers/MessageController");
const auth = require('../app/middleware/auth');

router.get('/get-thread/', auth, messageController.getMessageThread);
router.post('/get-messages/', auth, messageController.getMessages);

module.exports = router;