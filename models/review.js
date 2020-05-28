const mongoose = require('mongoose');

const Review = mongoose.model('Review', {
    title: { type: String, required: true },
    movieTitle: { type: String, required: true },
    description: String,
    rating: Number
});
module.exports = Review;