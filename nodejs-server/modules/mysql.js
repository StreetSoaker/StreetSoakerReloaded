var mysql = require('mysql');

var connection  = exports.connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'qrjdwqyurdpk',
  database : 'streetsoaker',
});

connection.connect();

