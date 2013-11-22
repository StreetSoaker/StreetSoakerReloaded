var io = require('socket.io').listen(8080);
var gamefile = require('./modules/game.js');
var games = [];
//console.log(baseInfo);
io.sockets.on('connection', function (socket) {
	var id = new Date().getTime();
	var game = new gamefile.game();
	var uniqueGame = game.startGame(id, 0, 0, 0, "Test game name", 3);
    games[id] = uniqueGame;
    socket.set('gameID', id);
    console.log(game);
    
    socket.on('getGameTime', function() {
    	var time = socket.get('gameID');
    	socket.emit('time', time);
    });

    socket.on('clearGameTime', function() {
    	var time = socket.get('game').clearInterval();
    });
});