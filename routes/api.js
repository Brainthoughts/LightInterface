const express = require("express"),
	router = express.Router(),
	display = require("../shared/display.js")

let currentConnections = [];

router.get("/", function (req, res) {
	if (req.query.hasOwnProperty('field')) {
		const field = req.query.field

		if (field === "type")
			res.send(display.getType())
		else if (display.getData().hasOwnProperty(field))
			res.send(display.getData()[field] + "")
		else
			res.sendStatus(404)

		return
	}
	if (req.query.hasOwnProperty('image')) {
		if (!display.getDisplay()['image'].hasOwnProperty('image')) {
			res.sendStatus(404)
			return
		}

		const fragmentIndex = parseInt(req.query.fragment_index)
		const fragmentSize = parseInt(req.query.fragment_size)

		const beg = fragmentIndex * fragmentSize
		const end = beg + fragmentSize

		let counter = 0;

		let data = []

		for (let col = 0; col < display.getDisplay().displayWidth; col++) {
			for (let row = 0; row < display.getDisplay().displayHeight; row++) {
				if (counter >= beg && counter < end) {
					data.push(display.getDisplay()['image'].image[col][row])
				}
				counter++
			}
		}

		res.send(data.join(' '))
		return
	}

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
			pushUpdate()
		}
	});
	ws.on('close', function (code, reason) {
		console.log("connect/close");
		let index = currentConnections.indexOf(ws)
		if (index > -1) {
			currentConnections.splice(index, 1)
		}
	})
});

function pushUpdate() {
	currentConnections.forEach(ws => ws.send(JSON.stringify({
		type: display.getType(),
		data: display.getData()
	})))
}

module.exports.router = router;
module.exports.pushUpdate = pushUpdate
