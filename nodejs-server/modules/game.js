var game = exports.game = function() {
	var this_ = this;

	this.id 				= null;
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
};

exports.game.prototype._configGame = function(private, password, radius, name, lat, long, gamemode, maxPlayers, fn) {
	var this_ = this;
	var fn = fn;

	this.private	= private;
	this.password	= (password.length > 0) ? "'"+password+"'" : "NULL";
	this.radius		= radius;
	this.name		= name;
	this.lat 		= lat;
	this.long 		= long;
	this.gamemode 	= gamemode;
	this.maxPlayers = maxPlayers;

	//Set Start Time
	var d = new Date();
	this.startTime = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();

	// Add game to db
	mysql_connection.query("INSERT INTO `games` VALUES('', "+ this.private +", "+ this.password +", "+ this.gamemode +", '"+ this.name +"', "+ this.lat +", "+ this.long +", "+ this.radius +", "+ this.maxPlayers +", '"+ this.startTime +"', NULL)", function(err, result) {
		if (err) throw err;
		this_.id = result.insertId;

		fn('succes');
	});
};

exports.join = function(gameID, password, socket, fn) {
	var error = checkPossibility(runningGames[gameID].id, password, socket);
	// Join the room for this game if possible
	if(!error) {
		socket.join(gameID, function() {
			console.log('Game '+ gameID +' joined by: '+ socket.id);
			runningGames[gameID].playerAmount++;
		});
	} else {
		console.log('Game '+ runningGames[gameID].id +' join failed by: '+ socket.id);
	}

	// Return error or false
	fn(error);
};

exports.leave = function(socket) {
	for(var i in io.sockets.manager.roomClients[socket.id]) {
		if(i.substr(1)) {
			if(socket.leave(i)) {
				console.log(i.substr(1));
				if(runningGames[i.substr(1)].playerAmount < 2) {
					runningGames[i.substr(1)].playerAmount--;
				} else {
					runningGames[i.substr(1)].playerAmount--;
				}
			}
		}
	}
};

var checkPossibility = function(gameID, password, socket) {
	socketID			= socket.id;
	var rooms			= io.sockets.manager.rooms;
	var playerAmount	= runningGames[gameID].playerAmount;
	var maxPlayerAmount = runningGames[gameID].maxPlayerAmount;
	var bool  = true;
	var error = false;

	for(var key in rooms) {
		if(key.substr(1) == gameID) {
			for(var i in rooms[key]) {
				if(rooms[key][i] == socketID) {
					if(bool)
						bool = false;
					error = 'Game already joined.';
				}
			}
			
			if(runningGames[gameID].password !== password) {
				if(bool)
					bool = false;
				error = 'Wrong password.';
			}
		}
	}

	if(bool) {
		if(playerAmount >= maxPlayerAmount) {
			bool = false;
			error = 'The game is full.';
		}
	}

	return error;
};