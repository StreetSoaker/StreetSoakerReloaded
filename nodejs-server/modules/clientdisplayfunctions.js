var gamesList = exports.gamesList = function() {
    console.log('START GAMESLIST');
    console.log(runningGames);
    // for(key in runningGames) {
    //     var numPlayers = runningGames[key].playerAmount;
    //     if(runningGames[key].playerAmount == runningGames[key].maxPlayers) {
    //         numPlayers = 'full';
    //     }
    //     jsonString += '"'+runningGames[key].name+'":{"numPlayers":"'+numPlayers+'"},';  
    // }

    // //Convert String to JSON (String -> JSON string -> JSON object)
    // jsonObject = JSON.parse(JSON.stringify(eval("(" + jsonString + ")")));

    // return jsonString;
    console.log('STOP GAMESLIST');
};