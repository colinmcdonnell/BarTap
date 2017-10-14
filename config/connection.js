

var mysql = require("mysql");


//-----------------
//Mysql Database Connection
//-----------------
var mysqlConnection = mysql.createConnection({
	database: "bev_db",
	user: "root",
	password: "Cricket47",
	hostname: "localhost"
});


mysqlConnection.connect(function(err){

	if(err){
		throw err
	}
	console.log("Connected as: " + mysqlConnection.threadId);
});




module.exports = mysqlConnection;







