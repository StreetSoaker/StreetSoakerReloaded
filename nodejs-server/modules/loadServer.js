var ffa             	= require('./gamemodes/ffa.js');
global.runningGames 	= new Object();
global.emitGames 		= new Object();
global.timers 			= new Object();

exports.games = function() {
	// Get public games
	mysql_connection.query("SELECT games.`id`, games.`name`, games.`private`, games.`gameMode`, games.`password`, games.`radius`, games.`maxPlayers`, games.`startDate`, games.`coorLong` AS `long`, games.`coorLat` AS `lat`, games.`maxPlayers`, COUNT(players.id) AS playerAmount FROM `games` LEFT JOIN `players` ON players.`gameId`=games.`id` WHERE games.`endDate` IS NULL GROUP BY games.id ORDER BY `private`,`name`", function(err, rows, fields) {
		if (err) throw err;
		
		emitGames = rows;

		// Create game list for the server
		// for(i in rows) {
		// 	emitGames[rows[i].id] = rows[i];
		// 	runningGames[rows[i].id] = rows[i];

		// 	ffa.boot(rows[i].id);
		// }
		convertClient();
	});
};

var convertPrivate = function() {
	// for(i in emitGames) {
	// 	if(emitGames[i].private === 1) {
	// 		emitGames[i].private = 'Private';
	// 	} else {
	// 		emitGames[i].private = 'Public';
	// 	}
	// }


	console.log(emitGames);
}

var convertClient = function() {
	for(i in emitGames) {
		// id
		// name
		// playerAmount
		// maxPlayers
		// private
		// delete emitGames[i].password;
		// delete emitGames[i].startDate;
		// delete emitGames[i].endDate;
		// delete emitGames[i].long;
		// delete emitGames[i].lat;
	}

	convertPrivate();
}