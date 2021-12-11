const express = require("express"),
    router = express.Router(),
    display = require("../shared/display.js")

let currentConnections = []; //current ws connections

router.get("/", function (req, res) {
    res.send({ //send json response over http
        type: display.getDisplay().inputType,
        data: display.getDisplay()[display.getType()]
    })
})
router.ws('/', function (ws, req) { //on websocket connection
    console.log("connect/open")
    ws.on('message', function (msg) { //on websocket message
        if (msg === "init") {
            console.log("connect/message")
            currentConnections.push(ws); //add the websocket to list of connected websockets
            pushUpdate(ws)
        }
    });
    ws.on('close', function (code, reason) { //on websocket close
        console.log("connect/close");
        let index = currentConnections.indexOf(ws)
        if (index > -1) { //if it exists in the array
            currentConnections.splice(index, 1)
        }
    })
});

function pushUpdate(ws) { //sends the update to all clients
    if (ws) { //send to singular ws
        ws.send(JSON.stringify({
            type: display.getType(),
            data: display.getData()
        }))
    } else { //send to all ws
        currentConnections.forEach(ws => ws.send(JSON.stringify({
            type: display.getType(),
            data: display.getData()
        })))
    }
}

module.exports.router = router;
module.exports.pushUpdate = pushUpdate
