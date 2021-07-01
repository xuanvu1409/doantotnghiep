const express = require('express');
const router = express.Router();
const messageController = require("../app/controllers/MessageController");
const auth = require('../app/middleware/auth');

router.get('/get-thread/', auth, messageController.getMessageThread);
router.get('/get-messages/', auth, messageController.getMessages);
router.post('/send-message', auth, messageController.sendMessage);

module.exports = router;