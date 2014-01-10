var bindPlayers = false;
var gameTimers = [];

exports.boot = function(gameID){
    // Haal spelers it het db na de server is gestart
	if(!bindPlayersInGame()) throw 'Kon players niet binden uit history.';

    // Set game timers
    gameTimers[gameID] = [];

    // Request location function/timer
    gameTimers[gameID]['requestLocation'] = setInterval(function() {
        
    }, 60000);

    // Display players on the map
    gameTimers[gameID]['requestLocation'] = setInterval(function() {

    }, 60000);
	
}

var bindPlayersInGame = function() {
	return true;
}