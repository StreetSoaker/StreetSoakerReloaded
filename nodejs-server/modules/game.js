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

exports.game.prototype._configGame = function(id, private, password, radius, name, lat, long, gamemode, maxPlayers, fn) {
	var this_ = this;
	var fn = fn;

	this.id 		= id;
	this.private	= private;
	this.password	= password;
	this.radius		= radius;
	this.name		= name;
	this.lat 		= lat;
	this.long 		= long;
	this.gamemode 	= gamemode;
	this.maxPlayers = maxPlayers;

	//Set Start Time
	var d = new Date();
	this.startTime = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();

	fn('test');
}

exports.game.prototype._startGame = function(private, password, radius, name, lat, long, gamemode, maxPlayers, fn) {
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
}

/*
 * @method join
 * @param INT gameID ID of the game that should be joined
 * @param Object socket Client's object
 */
exports.join = function(gameID, password, socket, fn) {
	checkPossibility(gameID, password, socket, function(error) {
		//console.log(error);

		// Join the room for this game if possible
		if(error === false) {
		    socket.join(gameID, function() {
		        console.log('Game '+ gameID +' joined by: '+ socket.id);
		        runningGames[gameID].playerAmount++;
		    });
		} else {
		    console.log('Game '+ runningGames[gameID].id +' join failed by: '+ socket.id);
		}

		// Return error or false
		fn(error);
	});
}

exports.leave = function(socket) {
	for(i in io.sockets.manager.roomClients[socket.id]) {
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
}

var checkPossibility = function(gameID, password, socket, cb) {
	socketID 			= socket.id
	var rooms 			= io.sockets.manager.roomClients[socket.id];
	var playerAmount 	= runningGames[gameID].playerAmount;
	var maxPlayerAmount = runningGames[gameID].maxPlayerAmount;
	var bool  = true;
	var error = false;
	if(Object.keys(rooms).length > 1) {
		error = 'Already joined a game!';
	}

	if(error === false) {
		if(password !== runningGames[gameID].password && runningGames[gameID].password !== null) {
			console.log(password);
			console.log(runningGames[gameID].password);
			error = 'Wrong password.';
		}
	}

	if(error === false) {
		if(playerAmount >= maxPlayerAmount) {
			error = 'The game is full.';
		}
	}

	cb(error);
}

var playerIsInRoom = function(gameID)
{
	var rooms = io.sockets.manager.rooms;

	for(key in rooms) {
		if(key.substr(1) == gameID) {
			for(i in rooms[key]) {
				if(rooms[key][i] == socketID) {
					return true;
				} else {
					return false;
				}
			}
		}
	}
}

// Broken won't use this anymore
exports.clientGameList = function() 
{
	var tempList = [];
	for (i in runningGames) {
		tempList[i] 			= {};
		tempList[i].id 			= runningGames[i].id;
		tempList[i].name 		= runningGames[i].name;
		tempList[i].private 	= runningGames[i].private;
		tempList[i].maxPlayers 	= runningGames[i].maxPlayers;
		tempList[i].gameMode 	= runningGames[i].gamemode;
	}

	console.log(tempList);
	tempList = convertPrivate(tempList);
	console.log(tempList);
	return tempList;
}

var convertPrivate = function(tempList)
{
	for(i in tempList) {
		if(tempList[i].private === 1) {
			tempList[i].private = 'Private';
		} else {
			tempList[i].private = 'Public';
		}
	}
}