exports.game = function(gameID) {
	this_ = this;

	this.id 				= gameID;
	this.lat 				= 0;
	this.long 				= 0;
	this.playTime 			= 0;
	this.name				= '';
	this.gamemode			= 1;
	this.playTimeInterval	= null;
}


exports.game.prototype.configGame = function(name, lat, long, name, gamemode) {
	this_ 			= this;
	this.lat 		= lat;
	this.long 		= long;
	this.name 		= String(name);
	this.gamemode 	= gamemode;
	this.startGame();
}

exports.game.prototype.addVal = function (value) {
	this.playTime = this.playTime+value;
	console.log(this.playTime);
}

// Start Playtime
exports.game.prototype.startGame = function() {
	this.playTimeInterval = setInterval(function() {
		//exports.game.playTime++;
		exports.game.prototype.addVal(1);
	}, 1000);
}


exports.game.prototype.clearPlayTime = function() {
	clearInterval(this.playTimeInterval);
	this.playTime = 0;
}