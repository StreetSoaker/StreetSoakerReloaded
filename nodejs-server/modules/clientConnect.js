exports.start = function(socket) {
    bindPlayerToRoom(2);
}

var bindPlayerToRoom = function(userId) {
    mysql_connection.query("SELECT players.gameId FROM `players` WHERE userId='"+ userId +"' ORDER BY `gameId` LIMIT 0,1", function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        
    });
}