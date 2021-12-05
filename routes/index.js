const express = require("express"),
    {body} = require('express-validator'),
    router = express.Router(),
    display = require("../shared/display.js")


router.get("/", function (req, res) {
    res.render("index/index")
})

router.post("/", function (req, res) {
    console.log(req.body)
    display.updateDisplay({
        message: req.body.message,
        color: [parseInt(req.body.color.substring(1,3),16),parseInt(req.body.color.substring(3,5),16),parseInt(req.body.color.substring(5),16)],
        scroll: (req.body.scroll === "true"),
        speed: parseInt(req.body.speed),
        displayWidth: 20,
        displayHeight: 30,
        brightness: parseFloat(req.body.brightness),
    })
    res.redirect("/")
})

module.exports = router;