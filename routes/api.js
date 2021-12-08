const express = require("express"),
	router = express.Router(),
	display = require("../shared/display.js")

let currentConnection;

router.get("/", function (req, res) {
	res.send({
		type: display.getDisplay().inputType,
		data: display.getDisplay()[display.getDisplay().inputType]
	})
})
router.ws('/', function (ws, req) {
	console.log("connect/open")
	ws.on('message', function (msg) {
		if (msg === "init") {
			console.log("connect/message")
			currentConnection = ws;
			pushUpdate()
		}
	});
});

function pushUpdate() {
	try {
		currentConnection.send(JSON.stringify({
			type: display.getDisplay().inputType,
			data: display.getDisplay()[display.getDisplay().inputType]
		}))
	} catch (e) {
		console.log(e)
	}
}

module.exports.router = router;
module.exports.pushUpdate = pushUpdate
