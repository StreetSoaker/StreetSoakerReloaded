var socket = io.connect('146.185.148.10:8080');
socket.on('connect', function () {
	socket.send('Hello back!');

	socket.on('time', function(data) {
		console.log('Time: '+data);
	});


});

