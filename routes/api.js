const express = require("express"),
    {body} = require('express-validator'),
    router = express.Router()

router.get("/", function (req, res) {
    res.send(res.locals.display)
})

module.exports = router;