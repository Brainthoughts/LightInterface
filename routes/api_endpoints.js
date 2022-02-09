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

function pongPlayerInitReceived(api, socket, data) {
    const playerIndex = api.connections.filter(connection => connection.type === 'pong_player').length

    if (playerIndex === 2) {
        socket.send(JSON.stringify({
            type: 'error',
            reason: 'Too many players connected'
        }))

        socket.close(1013)
        return
    }

    if (!data.name) {
        socket.send(JSON.stringify({
            type: 'error',
            reason: 'No player name provided'
        }))

        socket.close(1013)
        return
    }

    const connection = {
        index: playerIndex,
        name: data.name,
        type: 'pong_player',
        socket: socket
    }

    api.connections.filter(oconnection => oconnection.type === 'pong_player').forEach(oconnection => {
        oconnection.socket.send(JSON.stringify({
            type: 'pong_player_join',
            name: data.name
        }))
    })

    api.connections.push(connection)

    let connectedPlayers = []

    api.connections.filter(connection => connection.type === 'pong_player').forEach(connection => connectedPlayers.push(connection.name));

    socket.send(JSON.stringify({ type: 'init', players: connectedPlayers }))

    console.log('Pong player connected: ' + data.name)
}

function pongRequestStartReceived(api, socket, data) {
    if (api.pongRunning) {
        socket.send(JSON.stringify({
            type: 'error',
            reason: 'Game already started'
        }))
        return
    }

    const playerCount = api.connections.filter(oconnection => oconnection.type === 'pong_player').length

    api.connections.forEach(oconnection => {
        oconnection.socket.send(JSON.stringify({
            type: 'pong_start',
            players: playerCount
        }))
    })

    api.pongRunning = true
}

function pongMoveReceived(api, socket, data) {
    const connection = api.connections.filter(connection => connection.socket === socket)[0]

    if (connection.type !== 'pong_player') return

    api.connections.filter(oconnection => oconnection.type === 'board').forEach(oconnection => {
        oconnection.socket.send(JSON.stringify({
            type: 'pong_move',
            player: connection.index,
            position: data.position
        }))
    })
}

function pongPausedReceived(api, socket, data) {
    const connection = api.connections.filter(connection => connection.socket === socket)[0]

    if (connection.type !== 'board') return

    api.connections.filter(oconnection => oconnection.type === 'pong_player').forEach(oconnection => {
        oconnection.socket.send(JSON.stringify({ type: 'pong_paused' }))
    });
}

function pongResumeReceived(api, socket, data) {
    const connection = api.connections.filter(connection => connection.socket === socket)[0]

    if (connection.type !== 'board') return

    api.connections.filter(oconnection => oconnection.type === 'pong_player').forEach(oconnection => {
        oconnection.socket.send(JSON.stringify({ type: 'pong_resume' }))
    });
}

function closed(api, socket) {
    const connection = api.connections.filter(connection => connection.socket === socket)[0]

    if (!connection) return

    if (connection.type === 'pong_player') {
        api.connections.filter(oconnection => oconnection.type === 'pong_player').forEach(oconnection => {
            if (oconnection.index > connection.index) oconnection.index--

            oconnection.socket.send(JSON.stringify({
                type: 'pong_player_quit',
                name: connection.name
            }))

            connection.socket.close()
        })

        api.connections.forEach(oconnection => {
            oconnection.socket.send(JSON.stringify({ type: 'pong_stop' }))
        })

        api.pongRunning = false

        console.log('Pong player connection closed')
    }
    else if (connection.type === 'board') {
        console.log('Board connection closed')
    }
}

module.exports = {
    board_init: boardInitReceived,
    pong_player_init: pongPlayerInitReceived,
    pong_request_start: pongRequestStartReceived,
    pong_move: pongMoveReceived,
    pong_paused: pongPausedReceived,
    pong_resume: pongResumeReceived,
    closed: closed
}