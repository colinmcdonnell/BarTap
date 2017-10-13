

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

	addOrder: function(order_id, item_name, order_qty, cb){
		var queryString = "insert into orders (order_id, item_name, order_qty) " +
						  " values (?,?,?) ";
		  	if(typeof order_id != "number"){
		  		console.log(order_id)
		  		order_id = parseInt(order_id);
		  	}
		  	if(typeof order_qty != "number"){
		  		console.log(order_qty);
		  		order_qty = parseInt(order_qty);
		  	}

		  	mysqlConnection.query(queryString, [order_id, item_name, order_qty], function(err, result){
	  			if(err){
	  				throw err;
	  			}
	  			console.log(result);
	  			cb(err,"***");
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

	},

	updateInventory: function(item_name, order_qty, cb){
		console.log("UPDATE ENTERED");
		console.log("****"+ order_qty, item_name + "****");
			if(typeof order_qty != "number"){
		  		console.log(order_qty);
		  		order_qty = parseInt(order_qty);
		  	}
		var queryString = "update inventory "+
						  "set inventory_current = inventory_current + ? "+
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
	}


}

module.exports = orm;