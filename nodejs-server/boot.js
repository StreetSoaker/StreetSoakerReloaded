//Require modules
global.io           = require('socket.io').listen(8080);
var mysql           = require('./modules/mysql.js');
var loadServer      = require('./modules/loadServer.js').games();
var clientConnect   = require('./modules/clientConnect.js');
var gamefile        = require('./modules/game.js');

io.sockets.on('connection', function (socket) {

    clientConnect.start(socket);

    //Return games on clients request
    socket.on('getGames', function(name, fn) { 
       fn(runningGames);
    });

    // Player requests to join a game
    socket.on('joinGame', function(gameID) {
        //Log request in console
        console.log('Requests to join/make game id: ' + gameID + ' by ' + socket.id);
        
        gamefile.join(gameID, socket);

        //console.log(io.sockets.manager.roomClients[socket.id]);

        // Add info to the game
        //runningGames[game.id]._configGame(1, '', 300, gameID, 2.12344, 51.12345, 1, 42);


        //Get the playTime of the game if the gameID is set
        socket.on('getPlayTime', function() {
            console.log( runningGames[game.id]);
            var playTime = runningGames[game.id].playTime;
            socket.emit('time', playTime);
        });

        /*
         * NEVER USE THIS IN THE REAL APP
         */
        socket.on('clearPlayTime', function() {
            runningGames[game.id]._clearPlayTime();
        });

    });


    // On disconnect destrpy the game
    socket.on('disconnect', function() {
        gamefile.leave(socket);
    });
});