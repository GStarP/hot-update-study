var http = require('http')
var fs = require('fs')
var nws = require('nodejs-websocket')

var SERVER_PORT = 8889

const baseUrl = process.cwd()

var getFileData = function(path) {
  try {
    var fileData = fs.readFileSync(baseUrl + '\\src\\' + path)
    return fileData
  } catch(e) {
    return ''
  }
}

var ws = require('./ws').wsserrver

var sc = nws.connect('ws://127.0.0.1:8888')

var watchers = []
// watch file change
function createFileWatcher(path) {
  try {
    var fileWatcher = fs.watch(baseUrl + '\\src\\' + path)
    fileWatcher.on('change', function(event, name) {
      console.log('change: ' + name)
      var updateInfo = {
        type: path.split('\.')[path.split('\.').length - 1],
        name: path
      }
      sc.sendText(JSON.stringify(updateInfo))
    })
    console.log('watch: ' + path)
    return fileWatcher
  } catch(e) {
    console.log('watch error: ' + path)
    return null
  }
}

http.createServer(function(req, res) {
  var splitArr = req.url.split('/')
  var data = getFileData(splitArr[splitArr.length - 1])
  var watcher = createFileWatcher(splitArr[splitArr.length - 1])
  if (watcher !== null) {
    watchers.push(watcher)
  }
  res.end(data)
}).listen(SERVER_PORT).on('close', function() {
  watchers.forEach(function(w) {
    w.close()
  })
})

console.log('server start at ' + SERVER_PORT)
