var ffa             	= require('./gamemodes/ffa.js');
global.runningGames 	= new Object();
var emitGames 			= {};

exports.games = function() {
	// Get public games
	mysql_connection.query("SELECT games.`id`, games.`name`, games.`private`, games.`gameMode`, games.`maxPlayers`, COUNT(players.id) AS playerAmount FROM `games` LEFT JOIN `players` ON players.`gameId`=games.`id` WHERE games.`endDate` IS NULL GROUP BY games.id ORDER BY `private`,`name`", function(err, rows, fields) {
		if (err) throw err;
		console.log(rows[2].id);
		emitGames = rows;

		// Create game list for the server
		for(i in emitGames) {
			var id = emitGames[i].id;
			runningGames[id] = emitGames[i];
		}

		ffa.boot();
	});
};

exports.getClientGamesObject = function() {
	return emitGames;
};