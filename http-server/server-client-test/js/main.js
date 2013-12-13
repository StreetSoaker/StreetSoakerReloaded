var socket = io.connect('146.185.148.10:8080');
socket.on('connect', function () {

	socket.on('time', function(data) {
		console.log(data);
	});

	// Get game list
	socket.emit('getGames', '', function(data) {
		displayList(data);
	});
});

function displayList(data) {
	$('#currentGames').html('');
	for(i in data) {
		$('#currentGames').append('<tr class="' + i + '"><td>' + i + '</td><td>' + data[i].name + '</td><td>' + data[i].playerAmount + '/' + data[i].maxPlayers + '</td><td><a href="#' + i + '" onClick="socket.emit(\'joinGame\', ' + i + ', function(data) { displayList(data); });">Join</a></td></tr>');
	}
}

$(document).ready(function() {
	$('#joinGameForm').on('submit', function(event) {
		var gameID = $('#joinGameForm input[type="text"]').val();
		socket.emit('joinGame', gameID, function(data) { displayList(data); });

		event.preventDefault;
	});
});
