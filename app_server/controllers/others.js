const about = (req, res) => {
    res.render('index', {title: "About"})
};

const home = (req, res) => {
    res.render('index', {title: "Home"})
};

module.exports = {
    about,
    home
};