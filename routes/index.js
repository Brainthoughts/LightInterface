const express = require("express"),
    {body} = require('express-validator'),
    router = express.Router()

router.get("/", function (req, res) {
    res.render("index/index")
})

module.exports = router;