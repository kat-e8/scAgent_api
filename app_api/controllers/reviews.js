const mongoose = require('mongoose');
require('../models/players');
const Player = mongoose.model('Player');


const reviewsReadOne = (req, res) => {
   Player
        .findById(req.params.playerid)
        .then((player) => {
            if (player.reviews && player.reviews.length > 0) {
                review = player.reviews.id(req.params.reviewid)
                if(!review){
                    return res
                        .status(404)
                        .json({"message": "review not found"});
                }
                else{
                    response = {
                        player : {
                            name: player.name,
                            id: req.params.playerid
                        },
                        review
                    }
                    return res
                            .status(200)
                            .json(response);
                }
            }
        }).catch((err) => {
            return res
                .status(404)
                .json({"message": "player not found"});
        });

};

const reviewsUpdateOne = (req, res) => {
    if(!req.params.playerid || !req.params.reviewid){
        return res
                .status(400)
                .json({"message": "player id and review id required"});
    } else {
        Player
        .findById(req.params.playerid)
        .select('reviews')
        .then((player) => {
            if (player.reviews && player.reviews.length > 0) {
                review = player.reviews.id(req.params.reviewid)
                if(!review){
                    return res
                        .status(404)
                        .json({"message": "review not found"});
                }
                else{
                    if(req.body.trainer){
                        review.trainer = req.body.trainer;
                    }
                    if(req.body.reviewText){
                        review.reviewText = req.body.reviewText;
                    }
                    player
                        .save()
                        .then((player) => {
                            return res
                                    .status(200)
                                    .json(review);

                        }).catch((err) => {
                            return res
                                    .status(404)
                                    .json({"message": "could not save changes."});
                        });   
                }
            }
        }).catch((err) => {
            return res
                .status(404)
                .json({"message": "player not found"});
        });

    }

};

const reviewsDeleteOne = (req, res) => {
    if(!req.params.playerid || !req.params.reviewid){
        return res
                .status(400)
                .json({"message": "player id and review id required"});
    } else {
        Player
        .findById(req.params.playerid)
        .select('reviews')
        .then((player) => {
            if (player.reviews && player.reviews.length > 0) {
                review = player.reviews.id(req.params.reviewid)
                if(!review){
                    return res
                        .status(404)
                        .json({"message": "review not found"});
                }
                else{
                    player.reviews.id(req.params.reviewid).deleteOne();
                    player
                        .save()
                        .then((out) => {
                            return res
                                    .status(204)
                                    .json(null);

                        }).catch((err) => {
                            return res
                                    .status(404)
                                    .json({err});
                        });   
                }
            }
        }).catch((err) => {
            return res
                .status(404)
                .json({"message": "player not found"});
        });

    }  
};

const reviewsCreate = (req, res) => {
    playerid = req.params.playerid;
    if(playerid){
        Player
            .findById(playerid)
            .then((player) => {
                doAddReview(req, res, player);

            }).catch((err) => {
                return res
                        .status(404)
                        .json({"message": "player not found"});
            });
    }
    else{
        return res
                .status(404)
                .json({"message": "supply player id"});
    }
};

const doAddReview = (req, res, player) => {
    if(!player){
        return res
                .status(404)
                .json({"message":"player not found"});
    } else {
        const { trainer, reviewText, rating } = req.body;
        player.reviews.push({
            trainer,
            reviewText,
            rating
        });
        player
            .save()
            .then((player) => {
                const thisReview = player.reviews.slice(-1).pop();
                return res
                        .status(201)
                        .json(thisReview);

            }).catch((err) => {
                return res
                        .status(400)
                        .json(err);
            });
    }
}

module.exports = {
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne,
    reviewsCreate
};