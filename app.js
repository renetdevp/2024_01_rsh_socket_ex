const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const logger = require('morgan');

const path = require('path');
const { exec }= require('child_process');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

app.use(logger('common'));

io.on('connection', (socket) => {
    socket.on('cmd', (arg) => {
        exec(arg, (err, stdout, stderr) => {
            let res = '';

            if (err) return socket.emit('error', 'error while execute command');
            if (stdout) res += `STDOUT\n${stdout}`;
            if (stderr) res += `STDERR\n${stderr}`;

            socket.emit('result', res);
        });
    });
});

app.use('/rs', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/rs.html'));
});

module.exports = httpServer;