const express = require("express"),
    {body} = require('express-validator'),
    router = express.Router(),
    display = require("../shared/display.js")

router.get("/", function (req, res) {
    res.send({
	type: display.getDisplay().inputType,
	data: display.getDisplay()[display.getDisplay().inputType]
	})
})

module.exports = router;
