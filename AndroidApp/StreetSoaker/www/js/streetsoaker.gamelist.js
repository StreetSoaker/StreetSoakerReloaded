socket.on('connect', function() {
	socket.emit('getGames');
	socket.on('gamesObject', function(data){
		console.log(data);
	});
});