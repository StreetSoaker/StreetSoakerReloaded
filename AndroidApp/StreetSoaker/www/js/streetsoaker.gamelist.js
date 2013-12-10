socket.on('connect', function() {
	socket.emit('getGames', 'name', function(data){
		console.log(data);
		console.log('test');
	});

	var gameList = new kendo.data.DataSource({
		transport: {
			read: function(options){
				socket.emit('getGames', '', function(data){
					console.log(data);
					console.log('test');
					games = $.map(data, function(value, index) {
						return [value];
					});
					options.success(games);
				});
			}
		},
		group: "private",
	});

	$("#gameListView").kendoMobileListView({
		dataSource: gameList,
		pullToRefresh: true,
		filterable: false,
		style: "inset",
		template: '<a data-icon="globe"><span class="gameTitle">#: name #</span><span class="gameMode">#: gameMode #</span><span class="gamePlayers">#: playerAmount #/#: maxPlayers #</span></a>',
	});
});