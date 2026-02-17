const mongoose = require('mongoose');

const trainingTimeSchema = new mongoose.Schema({
    days: {
        type: String,
        required: true
    },
    opening: String,
    closing: String,
    closed: {
        type: Boolean,
        required: true
    }
});

const reviewSchema = new mongoose.Schema({
    trainer: String,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: String,
    timestamp: {
        type: Date,
        'default': Date.now
    }

});

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: Number,
    height: Number,
    weight: Number,
    positions: [String],
    trainingTimes: [trainingTimeSchema],
    reviews: [reviewSchema]

});

mongoose.model('Player', playerSchema);
