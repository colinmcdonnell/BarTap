

var mysql = require("mysql");
var mysqlConnection;

//-----------------
//Mysql Database Connection
//-----------------
if(process.env.JAWSDB_URL){
	mysqlConnection = mysql.createConnection(process.env.JAWSDB_URL);
} else{
	mysqlConnection = mysql.createConnection({
	database: "bev_db",
	user: "root",
	password: "password",
	hostname: "localhost"
  });

}
 

mysqlConnection.connect(function(err){

	if(err){
		throw err
	}
	console.log("Connected as: " + mysqlConnection.threadId);
});




module.exports = mysqlConnection;







