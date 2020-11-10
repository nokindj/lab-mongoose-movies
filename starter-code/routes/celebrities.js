const express = require('express');
const Celebrity = require('../models/Celebrity');
const router  = express.Router();

router.get("/celebrities", (req, res) => {
    Celebrity.find()
    .then((allTheCelebritiesFromDB) => {
        res.render("celebrities/index", {celebrities: allTheCelebritiesFromDB});
    });
});


router.get("/celebrities/new", (req, res) => {
    res.render("celebrities/new")
});

router.post("/celebrities/new", (req, res) => {
    let {name, occupation, catchPhrase} = req.body;
    Celebrity.create({
        name, 
        occupation, 
        catchPhrase
    }).then(() => {
        res.redirect("/celebrities")
    }).catch((err) => {
        res.render("celebrities/new");
      })
})

router.post("/celebrities/:celebritiesId/edit", (req, res) => {
    let celebritiesId = req.params.celebritiesId;
    let {name, occupation, catchPhrase} = req.body;
    Celebrity.findByIdAndUpdate(celebritiesId, {
        name, 
        occupation, 
        catchPhrase
    }).then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
        res.render("error", {err});
      })
  })

router.get("/celebrities/:celebritiesId", (req, res) => {
    let celebritiesId = req.params.celebritiesId;
    Celebrity.findById(celebritiesId)
    .then((theCelebrityFound) => {
        res.render("celebrities/edit", {celebrity: theCelebrityFound}); // celebrity, sendo este o nome que foi dado, 
                                        // este será o nome que tem de ser passado no view respectivo {{celebrity}}
    })
    .catch((err) => {
        res.render("error", {err});
    })
})

router.post("/celebrities/:celebritiesId/delete", (req, res) => {
    let celebritiesId = req.params.celebritiesId;
    Celebrity.findByIdAndRemove(celebritiesId) // we dont need the title, author, description, rating because we are not updating these properties.
    .then(() => {
      res.redirect("/celebrities")
    })
    .catch((err) => {
        res.render("error", {err});
    })
  })

router.get("/celebrities/:celebritiesId", (req, res) => {
    let celebritiesId = req.params.celebritiesId;
    Celebrity.findById(celebritiesId)
    .then((theCelebrityFound) => {
        res.render("celebrities/show", {celebrity: theCelebrityFound}); // celebrity, sendo este o nome que foi dado, 
                                        // este será o nome que tem de ser passado no view respectivo {{celebrity}}
    })
    .catch((err) => {
        res.render("error", {err});
    })
})



module.exports = router;