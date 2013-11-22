var io = require('socket.io').listen(8080);

//console.log(baseInfo);
io.sockets.on('connection', function (socket) {
    socket.send('Hello!');
});