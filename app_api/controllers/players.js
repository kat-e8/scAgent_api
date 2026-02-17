const playersByName = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};

const playersCreate = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});

};
const playersReadOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});

};
const playersUpdateOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});

};

const playersDeleteOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});

};

module.exports = {
    playersByName,
    playersCreate,
    playersReadOne,
    playersUpdateOne,
    playersDeleteOne
};