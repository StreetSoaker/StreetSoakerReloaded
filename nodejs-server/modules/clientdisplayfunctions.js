var gamesList = exports.gamesList = function() {
    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    //Sort games on name a-z
    //runningGames.sort(dynamicSort('id'));

    var jsonString = '{';
    for(key in runningGames) {
        var numPlayers = runningGames[key].playerAmount;
        if(runningGames[key].playerAmount == runningGames[key].maxPlayers) {
            numPlayers = 'full';
        }
        jsonString += '"'+runningGames[key].name+'":{"numPlayers":"'+numPlayers+'"},';  
    }
    jsonString += '}';

    //Convert String to JSON (String -> JSON string -> JSON object)
    jsonObject = JSON.parse(JSON.stringify(eval("(" + jsonString + ")")));

    return jsonString;
}