//const request = require('request');

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


const renderPlayerList = (req, res, responseBody) => {
    // let message = null;
    // if (!(responseBody instanceof Array)){
    //     message = "API lookup error";
    // } else {
    //     message = "";
    // }
    //generate list of options
    // res.render('player-list', {
    //     title: 'Player List',
    //         pageHeader: {
    //         title: 'Players',
    //         strapline: 'Monitor Player Progress',
    //         callToAction: 'Random call to action',
    //         context: 'random context'
    //     }
    //  //   players: responseBody,
    // });
};



const playerList = (req, res) => {
    res.render('player-list', {
        title: 'Player List',
            pageHeader: {
            title: 'Players',
            strapline: 'Monitor Player Progress',
            callToAction: 'Random call to action',
            context: 'random context'
        }
     //   players: responseBody,
    });
    //body = {}
    //renderPlayerList(req, res, body);
};

// const playerList = (req, res) => {
//     const path = '/api/players';
//     const requestOptions = {
//         url: `${apiOptions.server}${path}`,
//         method: 'GET',
//         json: {}
//     };
//     request(requestOptions, (err, {statusCode}, body) => {
//         if(statusCode === 200 && body.length){
//             renderTagList(req, res, body);
//         } else {
//             showError(res, res, statusCode);
//         }
//     });  
// };

// const renderDetailsPage = (req, res, player) => {
//     res.render('tag-info', {
//         title: player.name,
//         pageHeader: {
//             title: player.name,
//             strapline: 'random strapline'
//         },
//         sidebar: {
//                 context: 'random context that does not matter for now',
//                 callToACtion: 'Call to Action!'
//         },
//         player
//     });
// };

// const renderReviewForm = (req, res, {name}) => {
//     res.render('player-review-form', {
//         title: `Review ${name} on Ayo!`,
//         pageHeader: {title: `Review ${name}`}
//     });
// }

// const getPlayerInfo = (req, res, callback) => {
//     const path = `/api/tags/${req.params.tagid}`;
//     const requestOptions = {
//         url: `${apiOptions.server}${path}`,
//         method: 'GET',
//         json: {}
//     };
//     request(requestOptions, (err, {statusCode}, body) => {
//         let data = body;
//         if (statusCode === 200){
//             callback(req, res, data);
//         } else {
//             showError(req, res, statusCode);
//         }
//     });
// };


// const playerInfo = (req, res) => {
//     getTagInfo(req, res, 
//         (req, res, responseData) => renderDetailsPage(req, res, responseData));
// };


// const addReview = (req, res) => {
//     getTagInfo(req, res, 
//         (req, res, responseData) => renderReviewForm(req, res, responseData)
//     );
// };

// const doAddReview = (req, res) => {
//     tagid = req.params.tagid;
//     path = `/api/tags/${tagid}/annotations`;
//     postData = {
//         author: req.body.name,
//         comment: req.body.comment
//     };
//     requestOptions = {
//         url: `${apiOptions.server}${path}`,
//         method: 'POST',
//         json: postData
//     };
//     request(requestOptions, (err, {statusCode}, body) => {
//         if(statusCode === 201){
//             res.redirect(`/tags/${tagid}`);
//         } else {
//             showError(req, res, statusCode);
//         }
//     });
// };


// const addPlayer = (req, res) => {
//    res.render('player-add-form', {
//         title: `Add Tag`,
//         pageHeader: {title: `Add Player`}
//     });
// };

// const doAddPlayer = (req, res) => {
//     //generate sesssion token
//     path = `/api/tags`;
//     postData = {
//         name: req.body.name,
//         description: req.body.description,
//         quality: req.body.quality,
//         value: req.body.value
//     };
//     requestOptions = {
//     url: `${apiOptions.server}${path}`,
//     method: 'POST',
//     json: postData
//    };
//    request(requestOptions, (err, {statusCode}, responseBody) => {
//     if(statusCode === 201){
//             res.redirect(`/`);
//         } else {
//             showError(req, res, statusCode);
//         }
//    });
// };


//query canary api to get details of tag path specified

//hit mongo api to update existing record with new tvs

module.exports = {
    playerList
    // playerInfo,
    // addReview,
    // doAddReview,
    // doAddPlayer,
    // addPlayer
}