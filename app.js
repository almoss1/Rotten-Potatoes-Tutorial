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

const reviews = require('./controllers/reviews')(app);


// // INDEX
// app.get('/', (req, res) => {
//     Review.find({}).lean()
//         .then(reviews => {
//             res.render('reviews-index', { reviews: reviews })
//         })
//         .catch(err => {
//             console.log(err);
//         })
// })


app.listen("3000", () => {
    console.log("App listening on port 3000!'")
})

module.exports = app;