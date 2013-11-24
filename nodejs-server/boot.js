//Require modules
var io              = require('socket.io').listen(8080);
var gamefile        = require('./modules/game.js');
var clientDisplay   = require('./modules/clientdisplayfunctions.js');
var join             = require('./modules/joingame.js');

var runningGames    = new Array();

io.sockets.on('connection', function (socket) {
    socket.emit('runningGames', clientDisplay.gamesList(runningGames));

    socket.on('joinGame', function(gameID) {
        var game = null;

        console.log(socket.id + ' requests to join/make game id: ' + gameID);

        //Check if room exists
        if(io.sockets.clients(gameID).length == 0) {
            //Make game
            game = new gamefile.game(gameID);

            //Add game to runningGames
            runningGames[game.id]  =  game;

            //Join the room
            if(join.chechPossibility(game.id, io.sockets.manager.rooms, socket.id)) {
                socket.join(game.id, function() {
                    game.playerAmount++;
                    io.sockets.emit('runningGames', clientDisplay.gamesList(runningGames));
                });
            }

            console.log('Game ['+ game.id +'] made and joined by: '+ socket.id);
        } else {
            //Scope game
            game = runningGames[gameID];

            // Join the room for this game if possible
            if(join.chechPossibility(game.id, io.sockets.manager.rooms, socket.id, game.playerAmount, game.maxPlayers)) {
                socket.join(game.id, function() {
                    console.log('Game '+ game.id +' joined by: '+ socket.id);
                    game.playerAmount++;
                    io.sockets.emit('runningGames', clientDisplay.gamesList(runningGames));
                });
            } else {
                console.log('Game '+ game.id +' join failed by: '+ socket.id);
            }  
        }

        //console.log(io.sockets.manager.roomClients[socket.id]);

        // Add info to the game
        runningGames[game.id]._configGame(0, 0, 0, Date(), 3);


        //Get the playTime of the game if the gameID is set
        socket.on('getPlayTime', function() {
            console.log( runningGames[game.id]);
            var playTime = runningGames[game.id].playTime;
            socket.emit('time', playTime);
        });

        // On disconnect destrpy the game
        socket.on('disconnect', function() {
            //Destroy Game
            if(runningGames[game.id]._destroyGame()) {
                delete runningGames[game.id];
                console.log(socket.id + ' disconnected!');
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