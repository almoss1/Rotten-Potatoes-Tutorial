const Review = require('../models/review');

module.exports = function (app) {

    app.get('/', (req, res) => {
        Review.find()
            .then(reviews => {
                res.render('reviews-index', { reviews: reviews });
            })
            .catch(err => {
                console.log(err);
            });
    });


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
    //DELETE
    app.delete('/reviews/:id', (req, res) => {
        console.log("DELETE review");
        Review.findByIdAndDelete(req.params.id)
            .then((review) => {
                res.redirect('/')
            })
            .catch(() => {
                console.log(err)
            })
    })

}