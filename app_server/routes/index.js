const express = require('express');
const router = express.Router();
const ctrlPlayers = require('../controllers/players');
const ctrlOthers = require('../controllers/others');

/* Player pages. */
router.get('/', ctrlPlayers.playerList);
router.get('/player', ctrlPlayers.playerInfo);
router.get('/player/review/new', ctrlPlayers.addReview);

/** Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
