/**
* Generates the gamelist with data from the server
*
* @author	Koen van den Heuvel
*/

socket.on('connect', function() {
	//Datasource containing active games
	var gameList = new kendo.data.DataSource({
		transport: {
			read: function(options){
				//Request games object from nodejs server
				socket.emit('getGames', '', function(data){
					for(var i in data) {
						if(data[i].private === 1) {
							data[i].private = 'Private';
						} else {
							data[i].private = 'Public';
						}
					}

					//Convert the main object to a array containing game objects
					games = $.map(data, function(value, index) {
						return [value];
					});

					//Pass the games array to the datasource
					options.success(games);
				});
			}
		},

		//Group games by private and public games
		group:  {field: "private", dir: "desc"},

		//Sort all games based on name on ascending order
		sort: {field: "name", dir: "asc" }
	});

	//Generate Listview on gameListView ID
	$("#gameListView").kendoMobileListView({
		dataSource: gameList,
		pullToRefresh: true,
		style: "inset",
		template: '#if(private == "Public"){# <a data-icon="globe"> #}else{#  <a data-icon="ssLock"> #}# <span class="gameTitle">#: name #</span><span class="gameMode">#: gamemode #</span><span class="gamePlayers">#: playerAmount #/#: maxPlayers #</span></a>',
		click: function(e) {
			joinGame(e.dataItem.id, e.dataItem.private);
		}
	});

	function joinGame(id, private) {
		if(private == 'Private') {

		} else {
			password = '';
		}

		socket.emit('joinGame', id, password, function(data) {
			console.log(data);
			if (!data.error) {
				initGame(data.game);
			} else {
				alert(data.error);
            }
        });
    }

    function initGame(game) {
		window.location = "#index";
		var gamemarker = new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(game.lat, game.long),
			title: 'Some location'
		});

		// Add circle overlay and bind to marker
		var circle = new google.maps.Circle({
			map: map,
			radius: 300,    // 10 miles in metres
			fillColor: '#AA0000'
		});

		circle.bindTo('center', gamemarker, 'position');
	}
});