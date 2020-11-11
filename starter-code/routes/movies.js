const express = require('express');
const Movie = require('../models/Movie');
const router  = express.Router();

router.get("/movies", (req, res) => {
    Movie.find()
    .then((allTheMoviesFromDB) => {
        res.render("movies/index", {movies: allTheMoviesFromDB});
    });
});

router.get("/movies/new", (req, res) => {
    res.render("movies/new")
});

router.post("/movies/new", (req, res) => {
    let {title, genre, plot} = req.body;
    Movie.create({
        title, 
        genre, 
        plot
    }).then(() => {
        res.redirect("/movies")
    }).catch((err) => {
        res.render("movies/new");
      })
})

router.post("/movies/:moviesId/edit", (req, res) => {
    let moviesId = req.params.moviesId;
    let {title, genre, plot} = req.body;
    Movie.findByIdAndUpdate(moviesId, {
        title, 
        genre, 
        plot
    }).then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
        res.render("error", {err});
      })
  })

router.get("/movies/:moviesId", (req, res) => {
    let moviesId = req.params.moviesId;
    Movie.findById(moviesId)
    .then((theMovieFound) => {
        res.render("movies/edit", {movie: theMovieFound}); // celebrity, sendo este o nome que foi dado, 
                                        // este será o nome que tem de ser passado no view respectivo {{celebrity}}
    })
    .catch((err) => {
        res.render("error", {err});
    })
})

router.post("/movies/:moviesId/delete", (req, res) => {
    let moviesId = req.params.moviesId;
    Movie.findByIdAndRemove(moviesId) 
    .then(() => {
      res.redirect("/movies")
    })
    .catch((err) => {
        res.render("error", {err});
    })
  })

router.get("/movies/:moviesId", (req, res) => {
    let moviesId = req.params.moviesId;
    Movie.findById(moviesId)
    .then((theMovieFound) => {
        res.render("celebrities/show", {movie: theMovieFound}); 
                                        
    })
    .catch((err) => {
        res.render("error", {err});
    })
})

module.exports = router;