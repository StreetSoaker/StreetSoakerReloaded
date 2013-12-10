var ffa             	= require('./gamemodes/ffa.js');
global.runningGames 	= new Array();
var emitGames 			= {};

exports.games = function() {
	// Get public games
	mysql_connection.query("SELECT games.`id`, games.`name`, games.`private`, games.`gameMode`, games.`maxPlayers`, COUNT(players.id) AS playerAmount FROM `games` LEFT JOIN `players` ON players.`gameId`=games.`id` WHERE games.`endDate` IS NULL GROUP BY games.id ORDER BY `private`,`name`", function(err, rows, fields) {
		if (err) throw err;
		console.log(rows[2].id);
		emitGames = rows;
		ffa.boot();
	});
};

exports.getClientGamesObject = function() {
	return emitGames;
};

exports.bindPlayerToRooms = function(userId) {
	mysql_connection.query("SELECT players.gameId FROM `players` WHERE userId='"+ userId +"' ORDER BY `gameId` LIMIT 0,1", function(err, rows, fields) {
		if (err) throw err;
		console.log(rows);
		
	});
}