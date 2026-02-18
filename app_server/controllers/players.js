const request = require('request');

const apiOptions = {
    server: `http://localhost:${process.env.PORT}`
};

console.log('listening on ' + `${apiOptions.server}`);

// if (process.env.NODE_ENV === 'production'){
//     apiOptions.server = 'https://production';
// }

const showError = (req, res, status) => {
    let title = '';
    let content = '';
    if (status === 404) {
        title = '404,  page not found.';
        content = 'Oh dear, it looks like you can\'t find the page. Sorry. '
    } else {
        title = `${status}, something\'s gone wrong.`
        content = 'Something, somewhere has gone a little wrong.'
    }
    res.status(status);
    res.render('generic-text', {
        title,
        content
    });
};

const playerList = (req, res) => {
    const path = '/api/players';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    request(requestOptions, (err, {statusCode}, body) => {
        console.log(body);
        if(statusCode === 200 && body.length){
            renderPlayerList(req, res, body);
        } else {
            showError(res, res, statusCode);
        }
    });  
};


const renderPlayerList = (req, res, responseBody) => {
    let message = null;
    if (!(responseBody instanceof Array)){
        message = "API lookup error";
    } else {
        message = "";
    }
   // generate list of options
    res.render('player-list', {
        title: 'Ayobayo! - The Scouting Agent',
        pageHeader: {
            title: 'Ayobayo!',
            strapline: 'Monitor Player Progress',
        },
        sidebar: "Looking to track athlete development? Ayobayo helps you manage activities and records of players in your Team",
        players: responseBody,
        message
    });
}


const renderDetailsPage = (req, res, player) => {
    res.render('player-info', {
        title: player.name,
        pageHeader: {
            title: player.name,
            strapline: 'random strapline'
        },
        sidebar: {
                context: 'random context that does not matter for now',
                callToACtion: 'Call to Action!'
        },
        player
    });
};

const renderReviewForm = (req, res, {name}) => {
    res.render('player-review-form', {
        title: `Review ${name} on Ayo!`,
        pageHeader: {title: `Review ${name}`}
    });
}

const getPlayerInfo = (req, res, callback) => {
    const path = `/api/players/${req.params.playerid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    request(requestOptions, (err, {statusCode}, body) => {
        let data = body;
        if (statusCode === 200){
            callback(req, res, data);
        } else {
            showError(req, res, statusCode);
        }
    });
};


const playerInfo = (req, res) => {
     getPlayerInfo(req, res, 
         (req, res, responseData) => renderDetailsPage(req, res, responseData));
    
};


const addReview = (req, res) => {
    getPlayerInfo(req, res, 
        (req, res, responseData) => renderReviewForm(req, res, responseData)
    );
};

const doAddReview = (req, res) => {
    playerid = req.params.playerid;
    path = `/api/players/${playerid}/reviews`;
    postData = {
        trainer: req.body.trainer,
        rating: req.body.rating,
        reviewText: req.body.reviewText
    };
    requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: postData
    };
    request(requestOptions, (err, {statusCode}, body) => {
        if(statusCode === 201){
            res.redirect(`/players/${playerid}`);
        } else {
            showError(req, res, statusCode);
        }
    });
};


const addPlayer = (req, res) => {
   res.render('player-add-form', {
        title: `Add Player`,
        pageHeader: {title: `Add Player`}
    });
};

const doAddPlayer = (req, res) => {
    //generate sesssion token
    path = `/api/players`;
    postData = {
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight,
        positions: req.body.positions
    };
    requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'POST',
    json: postData
   };
   request(requestOptions, (err, {statusCode}, responseBody) => {
    if(statusCode === 201){
            res.redirect(`/`);
        } else {
            showError(req, res, statusCode);
        }
   });
};



module.exports = {
    playerList,
    playerInfo,
    addReview,
    doAddReview,
    doAddPlayer,
    addPlayer
};