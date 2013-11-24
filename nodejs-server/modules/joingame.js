var joinGame = function(gameID) {

}

/*
 * Check if the player is allowed to join
 */
var chechPossibility = exports.chechPossibility = function(gameID, rooms, socketID, playerAmount, maxPlayerAmount){
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