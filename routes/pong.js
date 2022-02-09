const express = require("express"), router = express.Router();

router.get("/", function (req, res) {
    res.render("pong")
})

module.exports = router;