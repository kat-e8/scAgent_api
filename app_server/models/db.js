const mongoose = require('mongoose');
require('./players');

const dbURI = 'mongodb://katmint.dala-cirius.ts.net/scagent';
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});