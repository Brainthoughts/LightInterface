const express = require("express"),
    router = express.Router()

router.get("/", function (req, res) {
    res.render("index/index")
})

router.get("/wstest", function (req, res) {
    res.render("index/wstest") //for testing websockets, unlisted
})


module.exports = router;