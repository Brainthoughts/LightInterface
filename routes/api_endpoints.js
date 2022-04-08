const {connections} = require("./api");

function boardInitReceived(api, socket, data) {
    const connection = {
        type: 'board',
        socket: socket
    }

    api.connections.push(connection)

    socket.send(JSON.stringify({ type: 'init' }))

    api.pushUpdate(socket)

    console.log('Board connected')
}

function closed(api, socket) {
    const connection = api.connections.filter(connection => connection.socket === socket)[0]

    if (!connection) return

    console.log('Board connection closed')
}

module.exports = {
    board_init: boardInitReceived,
    closed: closed
}