const express = require("express"),
    router = express.Router()

router.get("/wstest", function (req, res) {
    res.render("index/wstest") //for testing websockets, unlisted
})

router.get("/crash", function (req, res) {
    setTimeout(function () {
        throw new Error("Manual crash");
    }, 10)
})

module.exports = router;