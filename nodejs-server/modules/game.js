exports.game = function() {
	this_ = this;

	this.id 		= 0;
	this.lat 		= 0;
	this.long 		= 0;
	this.playTime 	= 0;
	this.name		= '';
	this.gamemode	= 1;
	this.interval	= 0;

	this.startGame = function(id, name, lat, long, name, gamemode) {
		this_.id 		= id;
		this_.lat 		= lat;
		this_.long 		= long;
		this_.name 		= name;
		this_.gamemode 	= gamemode;

		// Start Playtime
		this.interval = setInterval(function() {
			this_.playTime++;
			console.log('Play Time: '+ this_.playTime);
		}, 1000);
	}

	this.clearInterval = function() {
		clearInterval(this_.interval);
		this_.playTime = 0;
	}
}