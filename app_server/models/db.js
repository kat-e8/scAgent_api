const mongoose = require('mongoose');
require('./players');


//connection string
const dbURI = 'mongodb://katmint.dala-cirius.ts.net/scagent';

if(process.env.NODE_ENV === 'production') {
    dbURI = 'mongodb+srv://heroku:K%40stx8909@cluster0.7hhl6hq.mongodb.net/ppApp';
}

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});