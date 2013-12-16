exports.gameList = function() {
    var tempList = new Array();
    for(i in emitGames) {
        tempList.push({
            'id':               emitGames[i].id,
            'name':             emitGames[i].name,
            'gameMode':         emitGames[i].gameMode,
            'playerAmount':     emitGames[i].playerAmount,
            'maxPlayers':       emitGames[i].maxPlayers,
            'private':          emitGames[i].private
        });
    }

    return tempList;
}