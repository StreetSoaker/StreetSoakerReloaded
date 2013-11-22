var io          = require('socket.io').listen(8080);
var gamefile    = require('./modules/game.js');
var game        = new Array();
io.sockets.on('connection', function (socket) {
    // Generate unique ID
	var gameID     = new Date().getTime();

    // Make new game and save it
	game[socket.id]  = new gamefile.game(gameID);


	// Add info to the game
    game[socket.id].configGame(0, 0, 0, Date(), 3);



    //Get the playTime of the game if the gameID is set
    socket.on('getPlayTime', function() {
        var playTime = game[socket.id].playTime;
        socket.emit('time', playTime);
    });





    /*
     * NEVER USE THIS IN THE REAL APP
     */
    socket.on('clearPlayTime', function() {
    	game[socket.id].clearPlayTime();
    });
});