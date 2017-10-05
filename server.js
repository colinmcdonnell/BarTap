var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mysql = require("mysql");

var app = express();
var PORT = process.env.PORT || 3000; 

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// -------------------------------------------------


// // Any non API GET routes will be directed to our React App and handled by React Router
// app.get("*", function(req, res) {
//   res.sendFile(__dirname + "/public/index.html");
// });
// 

// -------------------------------------------------

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
  console.log("You are connected to mysql")
});

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Sirniloc89",
  database: "bev_db"
});

connection.connect(function(err) {
  if (err) throw err;
});

function selectAll(){
	var queryString = "SELECT * FROM bev";

	connection.query(queryString, function (err, result) {
    if (err){
    	throw err;
    }
    console.log(result);
  });
}

selectAll();

function selectItemType(){
	var queryString = "SELECT DISTINCT item_type FROM bev";

	connection.query(queryString, function (err, result) {
    if (err){
    	throw err;
    }
    console.log(result);
  });
}

selectItemType();

function selectItemName(){
	var queryString = "SELECT * FROM bev WHERE item_type = 'whiskey'";

	connection.query(queryString, function (err, result) {
    if (err){
    	throw err;
    }
    console.log(result);
  });
}

selectItemName();

// app.get("/login/:catg?", function(req,res){
//     console.log("it worked");
//     var dbQuery = "SELECT * FROM bev WHERE item_type = ?"
//       connection.query(dbQuery,[req.params.catg], function(err, result) {
//       res.json(result);
//       console.log(result);
//     });

// })


