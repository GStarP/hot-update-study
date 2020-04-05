var ws = require('nodejs-websocket')

var WS_PORT = 8888

var connections = []

var wsserrver = ws.createServer(function (connection) {

  connections.push(connection)

  connection.on('text', function(str) {
    connections.forEach(function(c) {
      c.sendText(str)
    })
  })

  connection.on('close', function() {
    connection = null
  })
  connection.on('error', function() {
    connection = null
  })

}).listen(WS_PORT)

console.log('wsserrver start at ' + WS_PORT)

module.exports = {
  wsserrver
}
