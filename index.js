const express = require('express');
const net = require('net');

const server = net.createServer((socket) => {
    socket.write('Echo server\r\n');
    socket.pipe(socket);
});

server.listen(8080, '127.0.0.1');

const app = express();

app.get('/test', (req, res) => res.send('hello'));

app.listen(5027, () => {
    console.log('Application is listening port 8080');
});