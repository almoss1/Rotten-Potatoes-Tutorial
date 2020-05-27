const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const methodOverride = require('method-override')

app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }))
app.set('view engine', 'handlebars')


// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))


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
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true, useUnifiedTopology: true });
const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String,
    description: String,
    rating: Number
});



// INDEX
app.get('/', (req, res) => {
    Review.find({}).lean()
        .then(reviews => {
            res.render('reviews-index', { reviews: reviews })
        })
        .catch(err => {
            console.log(err);
        })
})

// NEW
app.get("/reviews/new", (req, res) => {
    res.render('reviews-new', { title: "New Review" })
});

//show
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id)
        .then((review) => {
            console.log(req.params);
            res.render('reviews-show', { review: review })
        }).catch((err) => {
            console.log(err.message);
        })
})

//edit
app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, (err, review) => {
        console.log(req.params);
        res.render('reviews-edit', { review: review, title: "Edit Review" })
    })
});

// UPDATE
app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
            res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
})


// CREATE
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect(`/reviews/${review._id}`);
    })
        .catch((err) => {
            console.log(err);
        })
})


app.listen("3000", () => {
    console.log("App listening on port 3000!'")
})