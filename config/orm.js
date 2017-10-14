

var mysqlConnection = require("./connection.js");

var orm = {

	selectSomething: function(cb){
		var queryString = "select * " +
						  "from inventory";
		mysqlConnection.query(queryString, function(err, result){
			if(err){
				throw err;
			}
			console.log(result);
			cb(result);
		});
	},

	subtractSomething: function(value, row, cb){

		var queryString = "update inventory " +
						  "set current = current - ? " +
						  "where id = ?";

	  	mysqlConnection.query(queryString, [value, row], function(err, result){
	  		if(err){
	  			throw err;
	  		}
	  		console.log(result);
	  		cb(result);

	  	});


	},

	
	checkInventory: function(cb){
		var queryString = "select item_name, inventory_upper, current " +
						  "from inventory " +
						  "where current < inventory_lower";
	  	mysqlConnection.query(queryString, function(err, result){
	  		if(err){
	  			throw err;
	  		}
	  		else{
	  			// console.log(result);
	  			cb(null, result);
	  		}
	  	});
	  	 var queryStringTwo = "insert into invoice  (sent, received) "+
                             "values ('1', '0')";
         mysqlConnection.query(queryStringTwo, function(err, result){
             if(err){
                 throw err;
             }
             else{
                 console.log("Invoice insert works.");
             }
         });

	},

	updateInventory: function(item_name, order_qty, cb){
		console.log("UPDATE ENTERED");
		console.log("****"+ order_qty, item_name + "****");
			if(typeof order_qty != "number"){
		  		console.log(order_qty);
		  		order_qty = parseInt(order_qty);
		  	}
		var queryString = "update inventory "+
						  "set current = current + ? "+
					  	  "where item_name = ?";
		  	//   if(typeof order_qty != "number"){
		  	// 	console.log(order_qty);
		  	// 	order_qty = parseInt(order_qty);
		  	// }
  	  	mysqlConnection.query(queryString, [order_qty, item_name], function(err, result){
  	  		if(err){
  	  			throw err;
  	  		}
  	  		else{
  	  			console.log(result);
  	  		}
  	  	});
	},


	getOrderID: function(cb){
        var queryString = "select * from invoice order by id desc limit 1";

        mysqlConnection.query(queryString, function(err, data){
            if(err){
                throw err;
            }
            else{
                cb(null, data);
            }
        });
    },
    updateInventory: function(item_name, order_qty, cb){
        console.log("UPDATE ENTERED");
        console.log("****"+ order_qty, item_name + "****");
            if(typeof order_qty != "number"){
                  console.log(order_qty);
                  order_qty = parseInt(order_qty);
              }
        var queryString = "update inventory "+
                          "set current = current + ? "+
                            "where item_name = ?";
              //   if(typeof order_qty != "number"){
              //     console.log(order_qty);
              //     order_qty = parseInt(order_qty);
              // }
            mysqlConnection.query(queryString, [order_qty, item_name], function(err, result){
                if(err){
                    throw err;
                }
                else{
                    console.log(result);
                }
            });
    },
    updateInvoice: function(orderID, cb){
        var queryString = "update invoice "+
                          "set receieved = 1 "+
                          "where id = ?";
          mysqlConnection.query(orderID, function(err, result){
              if(err){
                  throw err;
              }
              else{
                  console.log("Invoice updated.");
              }
          });
      }

}

module.exports = orm;