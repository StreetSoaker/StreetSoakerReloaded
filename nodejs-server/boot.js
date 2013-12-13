/**
 * @author      Robin Valk
 * @version      0.5
 */
global.io           = require('socket.io').listen(8080);
var mysql           = require('./modules/mysql.js');
var loadServer      = require('./modules/loadServer.js').games();
var clientConnect   = require('./modules/clientConnect.js');
var clientDisplay   = require('./modules/clientDisplay.js');
var gamefile        = require('./modules/game.js');

io.sockets.on('connection', function (socket) {

    /**
    * @param Object socket Starts checking the user
    */
    clientConnect.start(socket);


    /**
    * Client requests to get the gamelist
    *
    * @method gameList
    * @return Object Gamelist for the app
    */
    socket.on('getGames', function(name, fn) { 
        /*
        * @return Object Gamelist for the app
        */
        fn(clientDisplay.gameList());
    });


    /**
    * Client requests to join a game, log the request, join the game, 
    *
    * @method   joinGame
    * @param    INT       gameID   ID of the game that should be joined
    * @param    OBJECT    fn       Callback function, gets executed when the functions finishes
    * @return                      (See todo)
    * @todo Decide what to return when the client joins a game
    */
    socket.on('joinGame', function(gameID, fn) {
        //Log request in console
        console.log('Requests to join/make game id: ' + gameID + ' by ' + socket.id);
        
        /*
         * @method join
         * @param INT gameID ID of the game that should be joined
         * @param Object socket Client's object
         */
        gamefile.join(gameID, socket);

        //console.log(io.sockets.manager.roomClients[socket.id]);

        /*
        *   todo Decide what to do with this
        */

        // //Get the playTime of the game if the gameID is set
        // socket.on('getPlayTime', function() {
        //     var playTime = runningGames[game.id].playTime;
        //     socket.emit('time', playTime);
        // });

        // /*
        //  * NEVER USE THIS IN THE REAL APP
        //  */
        // socket.on('clearPlayTime', function() {
        //     runningGames[game.id]._clearPlayTime();
        // });

        /*
         * Can return anything we need when te client joins
         */
        fn(runningGames);
    });


    /**
     * Client requests to create a game
     *
     * @method  createGame
     * @param   BOOL      private     Defines if the game is private or not
     * @param   STRING    password    Password for the game, requered if `private` is TRUE
     * @param   INT       radius      Defines the size of the playfield
     * @param   STRING    name        Name of the game
     * @param   FLOAT     lat         Latitude cordinate of the center of the game
     * @param   FLOAT     long        Longitude cordinate of the center of the game
     * @param   INT       gamemode    Definese the game of the game
     * @param   INT       maxPlayers  Definese the maximal amount of players in the game
     * @return  INT       gameID      ID of the created game
     */
    socket.on('createGame', function(
        private,
        password,
        radius,
        name,
        lat,
        long,
        gamemode,
        maxPlayers,
        fn
    ){
        // Generate new game object
        var tempGame = new gamefile.game();

        /**
         * Config game object with given info
         *
         * @method  _configGame
         * @param   BOOL      private     Defines if the game is private or not
         * @param   STRING    password    Password for the game, requered if `private` is TRUE
         * @param   INT       radius      Defines the size of the playfield
         * @param   STRING    name        Name of the game
         * @param   FLOAT     lat         Latitude cordinate of the center of the game
         * @param   FLOAT     long        Longitude cordinate of the center of the game
         * @param   INT       gamemode    Definese the game of the game
         * @param   INT       maxPlayers  Definese the maximal amount of players in the game
         * @param   OBJECT    fn          Callback function, gets executed when the functions finishes
         * @todo                          (See return)
         * @return  ?        ?            What to do when te game is made
         */
        tempGame._configGame(
            1,                              // private
            '',                             // password
            300,                            // radius
            'Test 14 van de 100',           // name
            2.12344,                        // latitude
            51.12345,                       // longitude
            1,                              // gamemode
            42,                             // maxPlayers
            function() {                    // callback function
                // Add game to running games
                runningGames[tempGame.id] = tempGame;

                // Create and join room for game with the client
                gamefile.join(tempGame.id, socket);

                // Return game ID to client
                fn(tempGame.id);
            }
        );
    })


    /**
    *  Client leaves the app/game
    */
    socket.on('disconnect', function() {
        gamefile.leave(socket);
    });
});