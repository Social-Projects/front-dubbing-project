var express = require('express')
var server = express()

server.use('/static', express.static(__dirname + '/build/static'));

/* final catch-all route to index.html defined last */
server.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

server.listen(3000)