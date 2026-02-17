const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
};

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
    });
}



// const playerList = (req, res) => {
//     res.render('player-list', {
//         title: 'Ayobayo! Track and Manage Players.',
//             pageHeader: {
//             title: 'Ayobayo!',
//             strapline: 'Monitor Player Progress from anywhere.',
//         },
//         sidebar: "Looking for a player management app? Ayobayo! helps you track and monitor player development as they make it through your academy. Let Ayobayo! help you get organized.",
//         players: [{
//             "name": "Ikaneng Maiterelo",
//             "address": "123 Magolego Avenue, PhumlaMqashi, Johannesburg",
//             "rating": 3,
//             "age": 11,
//             "height": 1.56,
//             "weight": 60,
//             "positions": [
//                 "Left Wing", "Inside Center", "False 9"
//             ]
//         },{
//             "name": "Ditlako Montsho",
//             "address": "12 Mkhonto Street, Boikhutso, Johannesburg",
//             "rating": 4,
//             "age": 12,
//             "height": 1.66,
//             "weight": 65,
//             "positions": [
//                 "Center Back", "Full Back", "DMF"
//             ]
//         },{
//             "name": "Mumuni Gogodze",
//             "address": "12 Apollo Crescent, Upsate Hills, Johannesburg",
//             "rating": 2,
//             "age": 10,
//             "height": 1.46,
//             "weight": 45,
//             "positions": [
//                 "Center Midfield", "Left Back", "Right Wing Forward"
//             ]
//         }]
//      //   players: responseBody,
//     });
//     //body = {}
//     //renderPlayerList(req, res, body);
// };


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
     getTagInfo(req, res, 
         (req, res, responseData) => renderDetailsPage(req, res, responseData));
    // res.render('player-info', {
    //     title: 'Player Details.',
    //         pageHeader: {
    //         title: 'Player Details',
    //         strapline: 'Monitor Player Progress from anywhere.',
    //     },
    //     sidebar: "is on Ayobayo! because he has the potential of one day turning into a professional.",
    //     lead: "",
    //     player: {
    //         "name": "Ikaneng Maiterelo",
    //         "address": "123 Magolego Avenue, PhumlaMqashi, Johannesburg",
    //         "rating": 3,
    //         "age": 11,
    //         "height": 1.56,
    //         "weight": 60,
    //         "positions": [
    //             "Left Wing", "Inside Center", "False 9"
    //         ],
    //         "trainingTimes": [
    //             {
    //             "days": "Monday - Friday",
    //             "opening": "9:00am",
    //             "closing": "3:00pm",
    //             "closed": false
    //             },
    //             {
    //             "days": "Saturday",
    //             "opening": "9:00am",
    //             "closing": "1:00pm",
    //             "closed": false
    //             },
    //             {
    //             "days": "Sunday",
    //             "closed": true
    //             }
    //         ],
    //         reviews: [{
    //             "trainer": "Alex Fegurson",
    //             "rating": 4,
    //             "timestamp": "2026-03-11T22:00:00.000Z",
    //             "reviewText": "Moderately improved tactical awareness."
    //         }]
    //     }
    // });
};


const addReview = (req, res) => {
 //   res.render('player-review-form', {title: 'Add Review'});
    getTagInfo(req, res, 
        (req, res, responseData) => renderReviewForm(req, res, responseData)
    );
};

const doAddReview = (req, res) => {
    playerid = req.params.playerid;
    path = `/api/players/${playerid}/reviews`;
    postData = {
        author: req.body.name,
        comment: req.body.comment
    };
    requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: postData
    };
    request(requestOptions, (err, {statusCode}, body) => {
        if(statusCode === 201){
            res.redirect(`/players/${playeridd}`);
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