var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mysql = require("mysql");
var JSFTP = require("jsftp");
var orm = require("./config/orm.js");
var fs = require("fs");

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
var orderID = "";

app.get("/scanInventory", function(req, res) {
   var createList = "";
   

orm.getOrderID(function(err, data){

    for(var i = 0; i < data.length; i++){
    orderID = data[i].id;
    console.log(orderID+"HERE IS THE ID");
    }
});

orm.checkInventory(function(err, data){

    if(err){
        throw err;
    }
    
    else{
        
        for(var i = 0; i < data.length; i++){
            console.log("**********");
            // console.log(inventoryUpper, inventoryCurrent, inventoryAmount);
            var inventoryUpper = data[i].inventory_upper;
            var inventoryCurrent = data[i].current;
            var orderAmount = inventoryUpper - inventoryCurrent;
            console.log("**********");
            console.log(inventoryUpper, inventoryCurrent, orderAmount);

            
            createList = createList.concat(1+","+data[i].item_name+","+orderAmount+":");
                
        }

    fs.writeFile("./testWrite", createList, function(error){
        if(error){
            console.log("error writing file.");
        }
        else{
            console.log("file written successfully");

            var ftp = new JSFTP({
                host: "ftp.drivehq.com",
                port: 21,
                user: "tyronesmiley",
                pass: "Tyronesmiley1"
            });

            ftp.put("./testWrite", "/bartapOrdersInbound.txt", function(hadError){

                if(hadError){
                    throw hadError;
                }
                else{
                    console.log("file written to FTP successfully");
                }
            });

        }
    });
    }
});

});

app.get("/importInventory", function(req, res) {
    var ftp = new JSFTP({
    host: "ftp.drivehq.com",
    port: 21,
    user: "tyronesmiley",
    pass: "Tyronesmiley1"
});



var stream = "";
ftp.get("/distributorExport.txt", function(err, socket){
    if (err){
        console.log(err);
    }


    socket.on("data", function(d){
        stream += d.toString();

    });
    socket.on("close", function(hadErr){
        if(hadErr){
        console.log("There was an error retrieving the remote file.");
        }

        var lines = stream.split(":");
        

        for (var i=0; i<lines.length; i++){

            if(lines[i].trim()){
            //For each line in the file, convert to an object    
            var cols = lines[i].split(',');

            // orm.addOrder(cols[0], cols[1], cols[2], function(err, data){
            //     if (err){
            //         console.log(err + "YOOOO");
            //     }
            // });

            orm.updateInventory(cols[1], cols[2], function(err, data){
                if(err){
                    throw err;
                }
                else{
                    console.log("Inventory updated sucessfully.");
                }
            });

            // orm.updateInvoice(orderID, function(err, data){
            //     console.log("Invoice updated successfully");
            // });



            }
        }
    });
    

    socket.resume();
});

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
    var dbQuery = "select sum(count) as count, item_name from sales group by item_name; "
    connection.query(dbQuery, function(err, result) {
        res.json(result);
    })
});

app.get("/bartender/:user?", function(req, res) {
    var dbQuery = "SELECT count*price_per_unit*units FROM sales WHERE user = ? "
    connection.query(dbQuery,[req.params.user], function(err, result) {
        res.json(result);
    })
});

app.post("/updateSales", function(req, res) {
    console.log("drink_name " +  req.body.item_name);
    console.log("drink_count " +  req.body.count);
    console.log("drink price " + req.body.price);
    console.log("drink unit " + req.body.unit);
    console.log("name " + req.body.name);
    var dbQuery = "INSERT INTO sales (item_name,count,price_per_unit,units,user ) VALUES (?,?,?,?,?)"
    connection.query(dbQuery, [req.body.item_name, req.body.count,req.body.price,req.body.unit,req.body.name], function(err, result) {
        res.json(result);
        console.log(result);
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