const express = require("express"),
    router = express.Router(),
    display = require("../shared/display.js"),
    endpoints = require("./api_endpoints")

let connections = []; //current ws connections

router.get("/", function (req, res) {
    res.send({ //send json response over http
        type: display.getDisplay().inputType,
        data: display.getDisplay()[display.getType()]
    })
})
router.ws('/', function (ws, req) { //on websocket connection
    console.log("connect/open")

    ws.on('message', function (message) { //on websocket message
        const data = JSON.parse(message)

        console.log('Received message: ' + data.type)

        if (endpoints[data.type]) endpoints[data.type](module.exports, ws, data)
    });
    ws.on('close', function (code, reason) { //on websocket close
        endpoints.closed(module.exports, ws)

        const index = connections.findIndex(connection => connection.socket === ws);

        if (index >= 0) connections.splice(index, 1);
    })
});

function pushUpdate(ws) { //sends the update to all clients
    if (ws) { //send to singular ws
        ws.send(JSON.stringify({
            type: 'display_' + display.getType(),
            data: display.getData()
        }))
    } else { //send to all ws
        connections.filter(connection => connection.type === 'board')
        .forEach(connection => connection.socket.send(JSON.stringify({
            type: 'display_' + display.getType(),
            data: display.getData()
        })))
    }
}

module.exports.connections = connections
module.exports.router = router
module.exports.pushUpdate = pushUpdate
