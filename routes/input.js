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
        displayWidth: 20,
        displayHeight: 30,
        brightness: parseFloat(req.body.brightness),
    })
    res.redirect(req.originalUrl)
})

module.exports = router;