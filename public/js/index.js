var socket = io();

socket.on('connect', function() {
    console.log('Connected to server..........');

    //once connected, we can create new Email
    socket.emit('createNewEmail',
        {
            from : 'jane@test.com',
            text : 'createNewEmail test text from client'
        }
    );
});

socket.on('disconnect', function(reason) {
    console.log('Disconnected from server..' + reason);
});

//receive new email from server, as and when it comes to server
socket.on('newEmail', function(email) {
    console.log('New Email event recieved : ' + email.text);
});
