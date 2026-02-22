const express = require('express');
const router = express.Router();

const ctrlPlayers = require('../controllers/players');
const ctrlOthers = require('../controllers/others');


/* Player Pages */
router
    .route('/players')
    .get(ctrlPlayers.playerList)
    .post(ctrlPlayers.doAddPlayer);

router.get('/players/:playerid', ctrlPlayers.playerInfo);
router.get('/add-Player', ctrlPlayers.addPlayer);


router
    .route('/players/:playerid/review/new')
    .get(ctrlPlayers.addReview)
    .post(ctrlPlayers.doAddReview);

/* About Page*/
router.get('/about', ctrlOthers.about);
router.get('/', ctrlOthers.home);
module.exports = router;
