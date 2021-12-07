const express = require("express"),
    {body} = require('express-validator'),
    router = express.Router(),
    display = require("../shared/display.js")


router.get("/simple", function (req, res) {
    res.render("input/simple")
})

router.post("/simple", function (req, res) {
    console.log(req.body)
    display.updateDisplay({
        message: req.body.message,
        textColor: [parseInt(req.body.textColor.substring(1,3),16),parseInt(req.body.textColor.substring(3,5),16),parseInt(req.body.textColor.substring(5),16)],
        borderColor: [parseInt(req.body.borderColor.substring(1,3),16),parseInt(req.body.borderColor.substring(3,5),16),parseInt(req.body.borderColor.substring(5),16)],
        scroll: (req.body.scroll === "true"),
        speed: parseInt(req.body.speed),
        brightness: parseFloat(req.body.brightness),
    }, req.url.split("/")[req.url.split("/").length -1])
    res.redirect(req.originalUrl)
})

router.get("/twoline", function (req, res) {
    res.render("input/twoLine")
})

router.post("/twoline", function (req, res) {
    console.log(req.body)
    display.updateDisplay({
        topMessage: req.body.topMessage,
        topTextColor: [parseInt(req.body.topTextColor.substring(1,3),16),parseInt(req.body.topTextColor.substring(3,5),16),parseInt(req.body.topTextColor.substring(5),16)],
        topScroll: (req.body.topScroll === "true"),
        topSpeed: parseInt(req.body.topSpeed),

        bottomMessage: req.body.bottomMessage,
        bottomTextColor: [parseInt(req.body.bottomTextColor.substring(1,3),16),parseInt(req.body.bottomTextColor.substring(3,5),16),parseInt(req.body.bottomTextColor.substring(5),16)],
        bottomScroll: (req.body.bottomScroll === "true"),
        bottomSpeed: parseInt(req.body.bottomSpeed),

        borderColor: [parseInt(req.body.borderColor.substring(1,3),16),parseInt(req.body.borderColor.substring(3,5),16),parseInt(req.body.borderColor.substring(5),16)],
        brightness: parseFloat(req.body.brightness),
    }, req.url.split("/")[req.url.split("/").length -1])
    res.redirect(req.originalUrl)
})

module.exports = router;