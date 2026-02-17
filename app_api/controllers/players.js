const mongoose = require('mongoose');
require('../models/players');
const Player = mongoose.model('Player');

const playersReadOne = (req, res) => {
    Player
        .findById(req.params.playerid)
        .then((player) => {
            if (!player) {
                return res
                    .status(404)
                    .json({"message": "player not found."});
            }
            else {
                return res
                    .status(200)
                    .json(player);
            }
        }).catch((err) => {
            return res
                .status(404)
                .json({"message": "playerid not found"});
        });
};

const playersReadAll = (req, res) => {
    Player
        .find()
        .then((players) => {
            if(players && players.length > 0){
                return res
                        .status(200)
                        .json(players)
            }
        })
        .catch((err) => {
                return res
                    .status(404)
                    .json({"message": "player list empty"});
        });

};

const playersUpdateOne = (req, res) => {
    if(!req.params.playerid){
        return res
                .status(404)
                .json({"message": "player not found, player id required."});
    } else {
        Player
            .findById(req.params.playerid)
            .select('-reviews')
            .then((player) => {
                if(req.body.name){
                    player.name = req.body.name;
                }
                if(req.body.address){
                    player.address = req.body.address;
                }
                if(req.body.age){
                    player.age = req.body.age;                
                }
                if(req.body.height){
                    player.height = req.body.height;
                }
                if(req.body.weight){
                    player.weight = req.body.weight;
                }
                player
                    .save()
                    .then((player) => {
                        return res
                                .status(200)
                                .json(player);
                    }).catch((err)=> {
                        return res
                                .status(404)
                                .json({"message": "playerid not found"});
                    });

            }).catch((err) => {
                return res
                        .status(400)
                        .json(err);
            });
    }
};

const playersCreate = (req, res) => {
    Player
        .create({
            name: req.body.name,
            address: req.body.address,
            age: req.body.age,
            height: req.body.height,
            weight: req.body.weight,
            positions: req.body.positions

        }).then((player) => {
            return res
                    .status(201)
                    .json(player);

        }).catch((err) => {
            return res
                    .status(400)
                    .json(err);
        });
 };

const playersDeleteOne = (req, res) => {
    const {playerid} = req.params;
    if(playerid){
        Player
            .findByIdAndDelete(playerid)
            .then((player) => {
                return res
                        .status(204)
                        .json(null);

            }).catch((err) => {
                return res
                        .status(404)
                        .json({"message": "player not found"});
            });
    } else {
        return res
                .status(404)
                .json({"message": "player id required"});
    }
};

module.exports = {
    playersReadOne,
    playersReadAll,
    playersUpdateOne,
    playersCreate,
    playersDeleteOne
};