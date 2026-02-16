const express = require('express');
const router = express.Router();

const ctrlPlayers = require('../controllers/players');
const ctrlOthers = require('../controllers/others');


/* Player Pages */
router
    .route('/players')
    .get(ctrlPlayers.playerList);
//    .post(ctrlPlayers.doAddPlayer);

router.get('/players/player', ctrlPlayers.playerInfo);
// router.get('/players/add-Player', ctrlPlayers.addPlayer);




router
    .route('/players/player/review/new')
    .get(ctrlPlayers.addReview)
//     .post(ctrlPlayers.doAddReview);

/* About Page*/
router.get('/about', ctrlOthers.about);
router.get('/', ctrlOthers.home);
module.exports = router;
