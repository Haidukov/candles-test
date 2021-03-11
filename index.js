const express = require('express');
const net = require('net');

const server = net.createServer((socket) => {
    socket.on('data', data => {
        console.log(data.toString());
        console.log(eval(data));
        console.log('connection data from %j', data);
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