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


app.get("/getdrinks/:catg?", function(req, res) {
    console.log(req.body.drinks);
    var dbQuery = "SELECT * FROM bev WHERE item_type = ?"
    connection.query(dbQuery, [req.params.catg], function(err, result) {
        res.json(result);
    })
});

app.get("/getprice/:drink", function(req, res) {
    console.log(req.params.drink);
    var dbQuery = "SELECT * FROM bev WHERE item_name = ?"
    connection.query(dbQuery, [req.params.drink], function(err, result) {
        res.json(result);
    })
});

app.get("/getInventoryData/", function(req, res) {
    var dbQuery = "SELECT * FROM inventory"
    connection.query(dbQuery, function(err, result) {
        res.json(result);
    })
});

app.get("/sales", function(req, res) {
    var dbQuery = "select sum(units_sold)as units_sold, item_name from sales group by item_name; "
    connection.query(dbQuery, function(err, result) {
        res.json(result);
    })
});

app.post("/updateSales", function(req, res) {
    console.log("drink_name" +  req.body.item_name);
    console.log("drink_count" +  req.body.count);
    var dbQuery = "INSERT INTO sales (units_sold, item_name) VALUES (?,?)"
    connection.query(dbQuery, [req.body.count, req.body.item_name], function(err, result) {
        res.json(result);
    })
});


app.get("/login/:emp_no", function(req, res) {


    var dbQuery = "SELECT * FROM users WHERE emp_no = ?"
    connection.query(dbQuery, [req.params.emp_no], function(err, result) {
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send('Employee Not found');
        }


    });

});

app.post("/updateInventory", function(req, res){
  let item_name = req.body.item_name;
  let count = req.body.count;
  let units = req.body.unit;
console.log("units: "+ units);

  let decVal = count * units;
  // console.log("decval: "+ decVal);
  // console.log("item_name"+ item_name);
  var dbQuery = "UPDATE inventory SET current=(current - ?) WHERE item_name=?"
  connection.query(dbQuery, [decVal, item_name], function(err, result) {
        res.json(result);

    });
    
});


app.get("*", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});