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
            socket.write(printToDevice('00000001'));
        }
        i++;
    });
});

/*
const data2 = Buffer.from('01'.split(' ').map(x => parseInt(x, 16)));
console.log(Buffer.from(data2));
*/



server.listen(5027, () => {
    console.log('TCP is listening port 5027');
});

const app = express();

app.get('/test', (req, res) => res.send('hello'));

app.listen(8080, () => {
    console.log('Application is listening port 8080');
});