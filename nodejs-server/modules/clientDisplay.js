exports.gameList = function() {
    var tempList = new Array();
    for(i in runningGames) {
        tempList.push({
            'id':               runningGames[i].id,
            'name':             runningGames[i].name,
            'gameMode':         runningGames[i].gameMode,
            'playerAmount':     runningGames[i].playerAmount,
            'maxPlayers':       runningGames[i].maxPlayers,
            'private':          runningGames[i].private
        });
    }

    return tempList;
}