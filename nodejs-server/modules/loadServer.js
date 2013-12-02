var runningGames = global.runningGames = new Array();
var clientGamesObject = new Array();

exports.games = function() {
	var emitGames = new Array();
	// Get public games
	mysql_connection.query("SELECT * FROM `games` WHERE `endDate` IS NULL AND `private`=0 ORDER BY `name`", function(err, rows, fields) {
		if (err) throw err;
		clientGamesObject['public'] = rows;

		// Get private games
		mysql_connection.query("SELECT * FROM `games` WHERE `endDate` IS NULL AND `private`=1 ORDER BY `name`", function(err, rows, fields) {
			if (err) throw err;
			clientGamesObject['private'] = rows;
			
			addPlayerAmount(clientGamesObject);
		});
	});
};

var addPlayerAmount = function(games) {
	this_ = this;
	this_.newGames = new Array();

	for(i in games) {
		runningGames.push(games[i]);
	}
}

var serverGames = function(games) {
	for(i in games) {
		runningGames.push(games[i]);
	}
};

exports.getClientGamesObject = function() {
	return clientGamesObject;
};