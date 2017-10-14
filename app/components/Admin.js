import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import User from "./User/User";
import Table from "./Table/Table";
import axios from 'axios';

export default class Admin extends Component {

	constructor(props){
		super(props);
		this.state = {
			name : props.location.state.user_name,
			image :  props.location.state.user_image,
			item_name : [],
			item_type : [],
			current_value: [],
			par_value: [],
			data: [],
			result: false,
			toggle: false,
			chart: false,
			scan: false,
			imported : false,
			bartender: false,
		}
		if(this.props.location.state == null){
			browserHistory.push("/");
		}
		
		this.logout = this.logout.bind(this);
		this.getInventory = this.getInventory.bind(this);
		this.genChart = this.genChart.bind(this);

		this.scanInventory = this.scanInventory.bind(this);
		this.importInventory = this.importInventory.bind(this);

		this.bartenderChart = this.bartenderChart.bind(this);
		

	}
	getInventory(){
		this.setState({chart: false});
		this.setState({scan: false});
		this.setState({imported: false});

		if(this.state.result === true){
			this.setState({data: [],
				result: false});
		}
		else {
			fetch('/getInventoryData/').then(function(response){
				return response.json();
			}).then(data => {
				this.setState({data: data,
					result: true});
			});
		}
		
	}


	logout(){
		this.setState({user: -1});
		browserHistory.push("/");
	}

	bartenderChart(){
		this.setState({chart: false});
		this.setState({scan: false});
		this.setState({imported: false});
		this.setState({data: [],
				result: false});
		if(this.state.bartender===false){

		var userarray = ["Colin","AK"];
		var user1 = 0;
		var user2 = 0;
		var submit = [];
		var count = 0;

		for(var i=0;i<userarray.length;i++){
			axios.get('/bartender/'+userarray[i]).then(function(response){
				console.log(response);
				
				for(var j=0;j<response.data.length;j++){
					count++;
					if(count>1){
						user2 = user2 + response.data[j]['count*price_per_unit*units '];
					}
					else{
						user1 = user1 + response.data[j]['count*price_per_unit*units '];
					}
					
				}
				console.log(user1);
				console.log(user2);

				var data = [{
				  type: 'bar',
				  color:['red','blue'],
				  x: [user1, user2],
				  y: [userarray[1],userarray[0]],
				  orientation: 'h'
				}];

				var layout = {
				  title: 'Sales by Bartender in $',
					};

				
					Plotly.newPlot('bartender', data, layout);

				

			
			});
		}
		this.setState({bartender: true});
	} else{
		document.getElementById("bartender").innerHTML = "";
		this.setState({bartender: false});
	}
		
		

		
		

	}

	genChart(){
		this.setState({data: [],
				result: false});
		this.setState({scan: false});
		this.setState({imported: false});
		this.setState({bartender: false});

		if(this.state.chart === false){
			axios.get('/sales')
  			.then(function (response) {

    			
					console.log("res length" + response.data.length);
		let salesData = [];

			for (var i = 0; i < response.data.length; i++) {
				let tempArr = [];
				let item_name = response.data[i].item_name;
				let units_sold = response.data[i].count;
				let price = response.data[i].price;
				let units = response.data[i].price;
				let user = response.data[i].user;
				tempArr.push(item_name);
				tempArr.push(units_sold);
				console.log("temparr : "+ tempArr);
				salesData.push(tempArr);
				
			}
  			console.log("salesData: "+ salesData);
			Highcharts.chart('container', {
				chart: {
					type: 'pie',
					options3d: {
						enabled: true,
						alpha: 45,
						beta: 0
					}
				},
				title: {
					text: 'PRODUCT SALES'
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						depth: 35,
						dataLabels: {
							enabled: true,
							format: '{point.name}'
						}
					}
				},
				series: [{
					type: 'pie',
					name: '<Sales></Sales>',
					data: salesData
				}]
			});	







})
  			.catch(function (error) {
    			console.log(error);
  			});
			this.setState({chart: true});
		}
		else {
			document.getElementById("container").innerHTML = "";
			this.setState({chart: false});
		}

	}

	scanInventory(){
		this.setState({data: [],
				result: false});
		this.setState({chart: false});
		this.setState({scan: true});
		this.setState({imported: false});
		this.setState({bartender: false});

		axios.get("/scanInventory").then(function (response) {
    			console.log(response);

  		})
  		.catch(function (error) {
    		console.log(error);
  		});
			
	}
	importInventory(){
		this.setState({scan: false});
		this.setState({data: [],
				result: false});
		this.setState({chart: false});
		this.setState({imported: true});
		this.setState({bartender: false});
		axios.get("/importInventory").then(function (response) {
    			console.log(response);
  		})
  		.catch(function (error) {
    		console.log(error);
  		});
	}

	render(){
		let inventoryData = this.state.result? <Table data={this.state.data} /> : "";
		let scanMessage = this.state.scan? "Inventory Scanned!" : "";
		let importMessage = this.state.imported? "Inventory Imported!" : "";
		let chartDisplay = this.state.chart? <div id="container"></div> : "";
		let bartenderDisplay = this.state.bartender? <div id="bartender"></div> : "";
		
		return(
		<div>
			
               <h1 id="navBar"> admin bartap </h1>

              	 <div className="row">

               		<div className="col-md-4">
                
                		<div className="row">        
                    		<div className="col-md-12">

	                        	<div id="gray">
	                            	<img id="photo" src={this.state.image}/> 
	                           		<h4 id="userName">{this.state.name}</h4>
	                  			</div>
                    

			                    <button className="btn" onClick={this.getInventory}>View Inventory</button>
			                    <button className="btn" onClick={this.genChart}>Generate Chart</button>
			                    <button className="btn" onClick={this.bartenderChart}>Generate Bartender Sales</button>
								<button className="btn" onClick={this.scanInventory}>Scan Inventory</button>
								<button className="btn" onClick={this.importInventory}>import Inventory</button>
			                    <button id="logout" className="btn3"  onClick={this.logout}>Logout</button>
			                </div>
			            </div>
			        </div>

	                

	                <div className ="col-md-8">
	                	{inventoryData}
	                	<h2>{scanMessage}</h2>
	                	<h2>{importMessage}</h2>
	                	{chartDisplay}
	                	{bartenderDisplay}
	                </div>

            	</div>
		</div>
			)
	}
}