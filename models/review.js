const mongoose = require('mongoose');


const Review = mongoose.model('Review', new mongoose.Schema({
    title: { type: String, required: true },
    movieTitle: { type: String, required: true },
    description: String,
    rating: Number
}, {
        timestamps: true
    }));

module.exports = Review;

