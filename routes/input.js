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
        textHexColor: req.body.textColor,
        borderHexColor: req.body.borderColor,
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
        topTextHexColor: req.body.topTextColor,
        topScroll: (req.body.topScroll === "true"),
        topSpeed: parseInt(req.body.topSpeed),

        bottomMessage: req.body.bottomMessage,
        bottomTextHexColor: req.body.bottomTextColor,
        bottomScroll: (req.body.bottomScroll === "true"),
        bottomSpeed: parseInt(req.body.bottomSpeed),

        borderHexColor: req.body.borderColor,
        brightness: parseFloat(req.body.brightness),
    }, req.url.split("/")[req.url.split("/").length -1])
    res.redirect(req.originalUrl)
})

module.exports = router;