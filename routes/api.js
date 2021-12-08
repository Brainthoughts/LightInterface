const express = require("express"),
	router = express.Router(),
	display = require("../shared/display.js")

let currentConnections = [];

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
			currentConnections.push(ws);
			ws.send(JSON.stringify({
				type: display.getDisplay().inputType,
				data: display.getDisplay()[display.getDisplay().inputType]
			}))
		}
	});
	ws.on('close', function (code, reason) {
		let index = currentConnections.indexOf(ws)
		if (index > -1){
			currentConnections.splice(index, 1)
		}	
	})
});

function pushUpdate() {
	currentConnections.forEach(ws => {
		try {
			ws.send(JSON.stringify({
				type: display.getDisplay().inputType,
				data: display.getDisplay()[display.getDisplay().inputType]
			}))
		}
		catch (e) {
			console.log(e)
		}

	})
}

module.exports.router = router;
module.exports.pushUpdate = pushUpdate
