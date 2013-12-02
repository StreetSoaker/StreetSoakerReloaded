var mysql = require('./mysql.js');
var game = exports.game = function(id) {
	var this_ = this;

	this.id 				= id;
	this.private			= 0;
	this.password			= '';
	this.radius				= 500;
	this.lat 				= 0;
	this.long 				= 0;
	this.name				= '';
	this.gamemode			= 1;
	this.maxPlayers			= 24;
	this.playerAmount		= 0;
	this.startTime			= null;
	this.playTime 			= 0;
	this.playTimeInterval	= null;

	this._startGame = function() {
		this.playTimeInterval = setInterval(function() {
			//exports.game.playTime++;
			this_.playTime++;
			//console.log(this_.id +': '+ this_.playTime +' s');
		}, 1000);
	}
}

exports.game.prototype._configGame = function(private, password, radius, name, lat, long, gamemode, maxPlayers) {
	this.private	= private;
	this.password	= (password.length > 0) ? "'"+password+"'" : "NULL";
	this.radius		= radius;
	this.name		= name;
	this.lat 		= lat;
	this.long 		= long;
	this.gamemode 	= gamemode;
	this.maxPlayers = maxPlayers;
	this._startGame();

	//Set Start Time
	var d = new Date();
	this.startTime = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();

	// Add game to db
	mysql.connection.query("INSERT INTO `games` VALUES('', "+ this.private +", "+ this.password +", "+ this.gamemode +", '"+ this.name +"', "+ this.lat +", "+ this.long +", "+ this.radius +", "+ this.maxPlayers +", '"+ this.startTime +"', NULL)", function(err, rows, fields) {
	if (err) throw err;

	});
}

exports.game.prototype._clearPlayTime = function() {
	clearInterval(this.playTimeInterval);
	this.playTime = 0;
}

exports.game.prototype._destroyGame = function() {
	this._clearPlayTime();
}