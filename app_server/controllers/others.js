const about = (req, res) => {
    res.render('generic-text', {title: "About"})
};

const home = (req, res) => {
    res.render('index', {title: "Ayobayo!"})
};

module.exports = {
    about,
    home
};