/**
* Displays the timers and alert for the game
*
* @author   Robin Valk
*/

socket.on('connect', function() {
    // On new time
    socket.on('displayTime', function(data) {
        if(data.type == 'countdown') {
            $('#timer').html('Game starts in <span>'+data.time+'</span> seconds');
        } else if(data.type == 'started') {
            $('#timer').html('Game started!');
        }
    });

    // Game start
    socket.on('gameStart', function(data) {
        alert('Game started!');
    });

    // Server requests to get latest know location
    socket.on('getLocation', function() {
        socket.emit('latestLocation', window.playerLocation);
    });

    // Server sends the latest know location
    socket.on('lastKnownLocations', function(data) {
        for( i in data) {
            console.log(data);
            var playerMarker = new google.maps.Marker({
                position: data[i],
                map: map,
                title: 'playerLocation'
            });
        }
    });
});