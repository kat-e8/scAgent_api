const express = require('express');
const router = express.Router();

const ctrlPlayers = require('../controllers/players');
const ctrlReviews = require('../controllers/reviews');

//players

router
    .route('/players')
    .get(ctrlPlayers.playersByName)
    .post(ctrlPlayers.playersCreate);

router
    .route('/players/:playerid')
    .get(ctrlPlayers.playersReadOne)
    .put(ctrlPlayers.playersUpdateOne)
    .delete(ctrlPlayers.playersDeleteOne);

//reviews

router
    .route('/players/:playerid/reviews')
    .post(ctrlReviews.reviewsCreate);
router
    .route('/players/:playerid/reviews/:reviewid')
    .get(ctrlReviews.reviewsReadOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;
