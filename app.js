const express = require("express");
const app = express();
const exphbs = require('express-handlebars');



app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// app.get('/', (req, res) => {
//     res.render('home', { msg: 'Handlebars are Cool!' });
// });
// OUR MOCK ARRAY OF PROJECTS
let review = [
    { title: "Great Review", movieTitle: "Batman II" },
    { title: "Awesome Movie", movieTitle: "Titanic" }
]

// INDEX
app.get('/', (req, res) => {
    res.render('reviews-index', { reviews: review });
})

app.listen("3000", () => {
    console.log("App listening on port 3000!'")
})