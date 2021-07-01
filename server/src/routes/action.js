const express = require('express');
const router = express.Router();
const encounterController = require("../app/controllers/EncounterController");
const auth = require('../app/middleware/auth');

router.post('/like/', auth, encounterController.like);
router.post('/favorite/', auth, encounterController.favorite);
router.post('/send-crush/', auth, encounterController.sendCrush);
router.get('/get', auth, encounterController.getAction);
router.get('/matched', auth, encounterController.getMatched);
router.get('/matched-request', auth, encounterController.getMatchedRequest);
router.delete('/remove-matched/:id', auth, encounterController.removeMatched);
router.get('/favorite-you', auth, encounterController.getFavoriteYou);
router.get('/your-favorites', auth, encounterController.getYourFavorites);
router.delete('/remove-favorite/:id', auth, encounterController.removeFavorite);
router.get('/confirm-matched/:id', auth, encounterController.confirmMatched);

module.exports = router;