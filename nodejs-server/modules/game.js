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
	mysql_connection.query("INSERT INTO `games` VALUES('', "+ this.private +", "+ this.password +", "+ this.gamemode +", '"+ this.name +"', "+ this.lat +", "+ this.long +", "+ this.radius +", "+ this.maxPlayers +", '"+ this.startTime +"', NULL)", function(err, rows, fields) {
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

exports.join = function(gameID) {
    //Check if room exists
    if(io.sockets.clients(gameID).length == 0) {
        //Make game
        game = new game(gameID);

        //Add game to runningGames
        runningGames[game.id]  =  game;

        //Join the room
        if(chechPossibility(game.id)) {
            socket.join(game.id, function() {
                game.playerAmount++;
                io.sockets.emit('runningGames', clientDisplay.gamesList(runningGames));
            });
        }

        console.log('Game ['+ game.id +'] made and joined by: '+ socket.id);
    } else {
        //Scope game
        game = runningGames[gameID];

        // Join the room for this game if possible
        if(chechPossibility(game.id)) {
            socket.join(game.id, function() {
                console.log('Game '+ game.id +' joined by: '+ socket.id);
                game.playerAmount++;
                io.sockets.emit('runningGames', clientDisplay.gamesList(runningGames));
            });
        } else {
            console.log('Game '+ game.id +' join failed by: '+ socket.id);
        }  
    }
}

var chechPossibility = function(gameID) {
	socketID 			= socket.id
	var rooms 			= io.sockets.manager.rooms;
	var playerAmount 	= runningGames[gameID].playerAmount;
	var maxPlayerAmount = runningGames[gameID].maxPlayerAmount;
	var bool = true;
	for(key in rooms) {
		if(key.substr(1) == gameID) {
			for(i in rooms[key]) {
				if(rooms[key][i] == socketID) {
					bool = false;
				}
			}
		}
	}

	if(bool) {
		if(playerAmount >= maxPlayerAmount) {
			bool = false;
		}
	}

	return bool;
}