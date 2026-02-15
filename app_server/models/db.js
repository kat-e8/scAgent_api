const mongoose = require('mongoose');
require('./players');

const dbURI = 'mongodb://localhost/scagent';
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});