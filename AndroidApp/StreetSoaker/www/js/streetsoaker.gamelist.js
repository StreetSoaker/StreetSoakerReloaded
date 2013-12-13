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

					//Convert the main object to a array containing game objects
					games = $.map(data, function(value, index) {
						return [value];
					});

					//Pass the games array to the datasource
					options.success(games);
					console.log('test merge github');
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
		template: '#if(private == "Public"){# <a data-icon="globe"> #}else{#  <a data-icon="ssLock"> #}# <span class="gameTitle">#: name #</span><span class="gameMode">#: gameMode #</span><span class="gamePlayers">#: playerAmount #/#: maxPlayers #</span></a>',
		click: function(e) {
			joinGame(e.dataItem.id);
		}
	});
});