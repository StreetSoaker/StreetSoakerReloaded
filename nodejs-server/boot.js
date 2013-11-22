var io = require('socket.io').listen(8080);
var gamefile = require('./modules/game.js');

//console.log(baseInfo);
io.sockets.on('connection', function (socket) {
	var id = new Date().getTime();
	var game = new gamefile.game();
	var uniqueGame = game.startGame(id, 0, 0, 0, "Test game name", 3);
    socket.set("game", uniqueGame);
    console.log(game);

    socket.on('getGameTime', function() {
    	var time = socket.get('game').playTime;
    	socket.emit('time', time);
    });
    socket.on('clearGameTime', function() {
    	var time = socket.get('game').clearInterval();
    });
});