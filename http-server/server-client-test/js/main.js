var socket = io.connect('146.185.148.10:8080');
socket.on('connect', function () {

	socket.on('time', function(data) {
		console.log(data);
	});

	// Get game list
	socket.emit('getGames');
	socket.on('gamesObject', function(data){
		for(i in data) {
			$('#currentGames').append('<tr class="' + i + '"><td>' + i + '</td><td>' + data[i].name + '</td><td>' + data[i].playerAmount + '/' + data[i].maxPlayers + '</td><td><a href="#' + i + '" onClick="socket.emit(\'joinGame\', ' + i + ');">Join</a></td></tr>');
		}
	});
});

$(document).ready(function() {
	$('#joinGameForm').on('submit', function(event) {
		var gameID = $('#joinGameForm input[type="text"]').val();
		socket.emit('joinGame', gameID);

		event.preventDefault;
	});
});
