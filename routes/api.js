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
			if (display.getDisplay().inputType == "image"){
				ws.send(JSON.stringify({type: display.getDisplay().inputType}))
				for (let col = 0; col < display.getDisplay().displayWidth; col++) {
					ws.send(JSON.stringify({
						col: col,
						data: display.getDisplay()[display.getDisplay().inputType].image[col]
					}))
				}
			}
			
			else {
				ws.send(JSON.stringify({
					type: display.getDisplay().inputType,
					data: display.getDisplay()[display.getDisplay().inputType]
				}))
			}
			
		}
	});
	ws.on('close', function (code, reason) {
		console.log("connect/close");
		let index = currentConnections.indexOf(ws)
		if (index > -1){
			currentConnections.splice(index, 1)
		}	
	})
});

function pushUpdate() {
	currentConnections.forEach(ws => {
		try {
			if (display.getDisplay().inputType == "image"){
				ws.send(JSON.stringify({type: display.getDisplay().inputType}))
				for (let col = 0; col < display.getDisplay().displayWidth; col++) {
					ws.send(JSON.stringify({
						col: col,
						data: display.getDisplay()[display.getDisplay().inputType].image[col]
					}))
				}
			}
			
			else {
				ws.send(JSON.stringify({
					type: display.getDisplay().inputType,
					data: display.getDisplay()[display.getDisplay().inputType]
				}))
			}
		}
		catch (e) {
			console.log(e)
		}

	})
}

module.exports.router = router;
module.exports.pushUpdate = pushUpdate
