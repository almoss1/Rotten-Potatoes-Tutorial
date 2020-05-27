const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));


// app.get('/', (req, res) => {
//     res.render('home', { msg: 'Handlebars are Cool!' });
// });
// OUR MOCK ARRAY OF PROJECTS
// let review = [
//     { title: "Great Review", movieTitle: "Batman II" },
//     { title: "Awesome Movie", movieTitle: "Titanic" },
//     { title: "Sick Movie", movieTitle: "Ford vs Ferrari" }
// ]
//mongoose
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });
const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String,
    description: String
});



// INDEX
app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', { reviews: reviews })
        })
        .catch(err => {
            console.log(err);
        })
})

app.get("/reviews/new", (req, res) => {
    res.render('reviews-new', {})
});


// CREATE
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect('/');
    })
        .catch((err) => {
            console.log(err);
        })
})


app.listen("3000", () => {
    console.log("App listening on port 3000!'")
})