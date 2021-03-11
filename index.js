const express = require('express');
const net = require('net');

const server = net.createServer((socket) => {
    socket.write('Echo server\r\n');

    socket.on('data', data => {
        console.log('data' + data);
    });

    socket.pipe(socket);
});


server.listen(5027, () => {
    console.log('TCP is listening port 5027');
});

const app = express();

app.get('/test', (req, res) => res.send('hello'));

app.listen(8080, () => {
    console.log('Application is listening port 8080');
});