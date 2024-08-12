const APP_PORT = 80;

const { createServer } = require('http');
const express = require("express");
const app = express();

const server = createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

app.use(express.static(__dirname + "/client/"));

var allClients = [];
io.on('connection', (socket)=>{

    console.log("connected")

    allClients.push(socket);

    socket.on("share", (url)=>{

        io.emit("share", url);

    })

    socket.on('disconnect', function() {
        var i = allClients.indexOf(socket);
        allClients.splice(i, 1);
    });

});


server.listen(APP_PORT, () => {
    console.log('server running at http://localhost:' + APP_PORT);
});