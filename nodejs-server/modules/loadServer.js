var ffa             	= require('./gamemodes/ffa.js');
var gamefile        	= require('./game.js');
global.runningGames 	= new Object();
global.emitGames 		= new Object();
global.timers 			= new Object();

exports.games = function() {
	// Get public games
	mysql_connection.query("SELECT games.`id`, games.`name`, games.`private`, games.`gameMode`, games.`password`, games.`radius`, games.`maxPlayers`, games.`startDate`, games.`coorLong` AS `long`, games.`coorLat` AS `lat`, games.`maxPlayers`, COUNT(players.id) AS playerAmount FROM `games` LEFT JOIN `players` ON players.`gameId`=games.`id` WHERE games.`endDate` IS NULL GROUP BY games.id ORDER BY `private`,`name`", function(err, rows, fields) {
		if (err) throw err;

		// Create game list for the server
		for(i in rows) {

			emitGames[rows[i].id] = rows[i];

			// Add game to the server gamelist
			runningGames[rows[i].id] = new gamefile.game();
			runningGames[rows[i].id]._configGame(rows[i].id, rows[i].private, rows[i].password, rows[i].radius, rows[i].name, rows[i].lat, rows[i].long, rows[i].gameMode, rows[i].maxPlayers, function(data) {
				console.log('Succes met maken van de game!')
			});

			ffa.boot(rows[i].id);
		}
	});
};