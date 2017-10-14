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
		}
		if(this.props.location.state == null){
			browserHistory.push("/");
		}
		
		this.logout = this.logout.bind(this);
		this.getInventory = this.getInventory.bind(this);
		this.genChart = this.genChart.bind(this);

	}
	getInventory(){
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

	genChart(){
		console.log(this.state.chart);
		if(this.state.chart === false){
			axios.get('/sales')
  			.then(function (response) {

    			// console.log(response.data[0].item_name);
    	
    			// 	[
					// ['Vodka', 20.0],
					// ['Beer', 25.0],
					// ['Whiskey', 26.8],
					// ['Tequila', 12.8],
					// ['Rum', 8.5],
					// ['Gin', 6.2],
					// ['Cordials', 0.7]
					// ]

					console.log("res length" + response.data.length);
		let salesData = [];

			for (var i = 0; i < response.data.length; i++) {
				let tempArr = [];
				let item_name = response.data[i].item_name;
				let units_sold = response.data[i].count;
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
					name: 'Browser share',
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
	render(){
		let data = this.state.result;
		let inventoryData = "";
		if(data){
			inventoryData = <Table data={this.state.data} />
		}
		
		return(
			<div>
			<h1>Admin Page</h1>
			<button id="logout" className="btn-default"  onClick={this.logout}>Logout</button>
			<div><br/></div>
			<User name={this.state.name} image={this.state.image} />
			<div><br/></div>
			<button className="btn-default" onClick={this.getInventory}>View Inventory</button>
			<span> </span>
			<button className="btn-default" onClick={this.genChart}>Generate Chart</button>
			
			{inventoryData}

			<div id="container"></div>



			</div>
			)
	}
}