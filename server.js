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

  password: "lindsaysql",

  

  database: "bev_db"
});

connection.connect(function(err) {
  if (err) throw err;
});


app.get("/getdrinks/:catg?", function(req,res){
	console.log(req.body.drinks);
	var dbQuery = "SELECT * FROM bev WHERE item_type = ?"
	  connection.query(dbQuery,[req.params.catg], function(err, result) {
	  	console.log(result);
	  	res.json(result);
	  })
	});

app.get("/getprice/:drink", function(req,res){
	console.log(req.params.drink);
	var dbQuery = "SELECT price FROM bev WHERE item_name = ?"
	  connection.query(dbQuery,[req.params.drink], function(err, result) {
	  	console.log(result);
	  	res.json(result);
	  })
	});





app.get("/login/:emp_no", function(req,res){


  var dbQuery = "SELECT * FROM users WHERE emp_no = ?"
    connection.query(dbQuery,[req.params.emp_no], function(err, result) {
      if(result.length > 0){
        res.json(result[0]);
      }
      else{
        res.status(404).send('Employee Not found');     
      }
   
      
    });

});

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

