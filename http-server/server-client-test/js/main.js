var socket = io.connect('146.185.148.10:8080');
socket.on('connect', function () {

	socket.on('runningGames', function(data) {
		$('#currentGames').html(' ');
		console.log(data);
		for(key in data) {
			$('#currentGames').append("\n<li>Name:"+ key + " [Num Players:"+ data[key].numPlayers +"]</li>");
		}
	});

	socket.on('time', function(data) {
		console.log(data);
	});

	socket.on('gamesObject', function(data) {
		console.log(data);
		console.log('----------------------------------------------------------------------------');
	});
});

$(document).ready(function() {
	$('#joinGameForm').on('submit', function(event) {
		var gameID = $('#joinGameForm input[type="text"]').val();
		socket.emit('joinGame', gameID);

		event.preventDefault;
	});
});
