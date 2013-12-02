var mysql = require('mysql');

var mysql_connection  = global.mysql_connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'qrjdwqyurdpk',
  database : 'streetsoaker',
});

mysql_connection.connect();

