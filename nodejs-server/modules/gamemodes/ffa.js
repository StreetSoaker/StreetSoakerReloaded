var bindPlayers = false;
var gameTimers = [];

exports.boot = function(gameID){
    // Haal spelers it het db na de server is gestart
	if(!bindPlayersInGame()) throw 'Kon players niet binden uit history.';

    // Set game timers
    gameTimers[gameID] = [];

    // Start game in given time in seconds
    gameTimers[gameID]['startCountdown'] = 11;

    // Request location
    gameTimers[gameID]['requestLocation'] = 11;

    // Timer for every timer
    gameTimers[gameID]['timer'] = setInterval(function() {
        // Display start countdown if needed
        if(gameTimers[gameID]['startCountdown'] !== false) {
            if(gameTimers[gameID]['startCountdown'] !== 0) {
                // Display time
                io.sockets.in(gameID).emit('displayTime', {type: 'countdown', time: gameTimers[gameID]['startCountdown']});
                
                // Lower the count
                gameTimers[gameID]['startCountdown']--;
            } else {
                // Display time
                io.sockets.in(gameID).emit('displayTime', {type: 'started'});
                
                // Show game start alert
                io.sockets.in(gameID).emit('gameStart');

                console.log('Game ' + gameID + ' started!');

                // Disable countdown
                gameTimers[gameID]['startCountdown'] = false;
            }
        }

        // Request clients location when the game is started
        if(gameTimers[gameID]['startCountdown'] === false && gameTimers[gameID]['requestLocation'] !== false) {
            if(gameTimers[gameID]['requestLocation'] !== 0) {
                gameTimers[gameID]['requestLocation']--;
            } else {
                // Get clients location
                io.sockets.in(gameID).emit('getLocation');

                setTimeout(function() {
                    io.sockets.in(gameID).emit('lastKnownLocations', getLocations(gameID));
                }, 200);
                // Reset count time
                gameTimers[gameID]['requestLocation'] = 11;
            }
        }
    }, 1000);
	
}

var getLocations = function(gameID) {
    var locations = [];
    var players = io.sockets.clients(gameID);

    for(i in players) {
        locations[i] = players[i].lastKnownLocation;
    }

    return locations;
}

var bindPlayersInGame = function() {
	return true;
}