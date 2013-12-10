//Require modules
global.io              = require('socket.io').listen(8080);
var loadServer      = require('./modules/loadServer.js');
var gamefile        = require('./modules/game.js');
var clientDisplay   = require('./modules/clientdisplayfunctions.js');
var mysql           = require('./modules/mysql.js');
loadServer.games();

io.sockets.on('connection', function (socket) {

    loadServer.bindPlayerToRooms(2);

    //Return games on request
    socket.on('getGames', function() { 
        socket.emit('gamesObject', loadServer.getClientGamesObject());
    });


    //console.log(runningGames);

    // Temp
    socket.emit('runningGames', 'clientDisplay.gamesList()');

    socket.on('joinGame', function(gameID) {
        
        var game = null;

        console.log(socket.id + ' requests to join/make game id: ' + gameID);
        
        gamefile.join();


        //console.log(io.sockets.manager.roomClients[socket.id]);

        // Add info to the game
        runningGames[game.id]._configGame(1, '', 300, gameID, 2.12344, 51.12345, 1, 42);


        //Get the playTime of the game if the gameID is set
        socket.on('getPlayTime', function() {
            console.log( runningGames[game.id]);
            var playTime = runningGames[game.id].playTime;
            socket.emit('time', playTime);
        });

        // On disconnect destrpy the game
        socket.on('disconnect', function() {
            console.log(io.sockets.manager.roomClients[socket.id]);
            for(i in io.sockets.manager.roomClients[socket.id]) {
                if(i.substr(1)) {
                    if(socket.leave(i)) {
                        if(game.playerAmount < 2) {
                            game._clearPlayTime;
                            delete runningGames[gameID];
                        } else {
                            game.playerAmount--;
                        }
                        io.sockets.emit('runningGames', clientDisplay.gamesList(runningGames));
                    }
                }
            }
        });

        /*
         * NEVER USE THIS IN THE REAL APP
         */
        socket.on('clearPlayTime', function() {
            runningGames[game.id]._clearPlayTime();
        });
    });
});