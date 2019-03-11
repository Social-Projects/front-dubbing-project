const express = require('express');
const cors = require('cors');
const server = express();

server.use(cors());

server.use('/static', express.static(__dirname + '/build/static'));

server.get('*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});

server.listen(3000);