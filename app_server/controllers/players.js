/* GET homepage */
const playerList = (req, res) => { 
    res.render('index', { title: 'list of players'})
};

const playerInfo = (req, res) => {
    res.render('index', {title: 'player information'})
};

const addReview = (req, res) => {
    res.render('index', {title: 'add review'})
};

module.exports = {
  playerList,
  playerInfo,
  addReview
};