var game = exports.game = function(id) {
	var this_ = this;

	this.id 				= id;
	this.lat 				= 0;
	this.long 				= 0;
	this.name				= '';
	this.gamemode			= 1;
	this.maxPlayers			= 24;
	this.playerAmount		= 0;
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

exports.game.prototype._configGame = function(name, lat, long, name, gamemode) {
	this.lat 		= lat;
	this.long 		= long;
	this.name 		= String(name);
	this.gamemode 	= gamemode;
	this._startGame();
}

exports.game.prototype._clearPlayTime = function() {
	clearInterval(this.playTimeInterval);
	this.playTime = 0;
}

exports.game.prototype._destroyGame = function() {
	this._clearPlayTime();
}