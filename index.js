const express = require('express');
const net = require('net');
const converter = require('hex2dec');

const printToDevice = data => Buffer.from(data.split(' ').map(x => parseInt(x, 16)));

const server = net.createServer((socket) => {
    let i = 0;
    socket.on('data', data => {
        if (i === 0) {
            console.log(eval(data));
            socket.write(printToDevice('01'));
        }
        else {
            console.log(eval(data));
            socket.write(printToDevice('00 00 00 01'));
        }
        i++;
    });
});

const server2 = net.createServer(socket => {
    let i = 0;
    socket.on('data', data => {
        if (i === 0) {
            console.log(eval(data));
            socket.write(printToDevice('01'));
        }
        const command = '2C 01 00 00 00 14';
        const teltonikaCommand = `00 00 00 00 00 00 00 0E 0C 01 05 00 00 00 06 ${command} 01 00 00 00 00`;
        socket.write(printToDevice(teltonikaCommand));
        i++;
    });
});

console.log(printToDevice('00 00 00 01'));

/*
const data2 = Buffer.from('01'.split(' ').map(x => parseInt(x, 16)));
console.log(Buffer.from(data2));
*/


server2.listen(5280, () => {
    console.log('TCP is listening port 5280');
});

server.listen(5027, () => {
    console.log('TCP is listening port 5027');
});

const app = express();

app.get('/test', (req, res) => res.send('hello'));

app.listen(8080, () => {
    console.log('Application is listening port 8080');
});