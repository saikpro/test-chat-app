const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname + '/../public');
//console.log(__dirname + '/../public');
//console.log(publicPath);

const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    //console.log('New User Connected');
    socket.emit('newUserJoined', {
            from : 'Admin',
            text : 'Hello User',
            createdAt : new Date().getTime()
    });
    socket.broadcast.emit('newUserJoined', {
        from : 'Admin',
        text : 'New User Joined',
        createdAt : new Date().getTime()
    });


    socket.on('disconnect', (socket) => {
        console.log('User is disconnected');
    });
    socket.on('createNewEmail', (email) => {
        console.log('Create mail request recieved from client : ' + email.text);;
    });
    socket.on('newEmail', (email) => {
        socket.broadcast.emit('newEmail',
        {
                from : email.from,
                text : email.text,
                createdAt : 123
        });
    });
});



server.listen(port, () => {
    console.log(`Server started at port ${port}...`);
});
