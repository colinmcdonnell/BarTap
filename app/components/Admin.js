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
		this.scanInventory = this.scanInventory.bind(this);

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
					text: 'Browser market shares at a specific website, 2014'
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
					data: [
					['Firefox', 45.0],
					['IE', 26.8],
					{
						name: 'Chrome',
						y: 12.8,
						sliced: true,
						selected: true
					},
					['Safari', 8.5],
					['Opera', 6.2],
					['Others', 0.7]
					]
				}]
			});	  
			this.setState({chart: true});

		}
		else {
			document.getElementById("container").innerHTML = "";
			this.setState({chart: false});
		}

	}

	scanInventory(){
		console.log("Scan Clicked");
		axios.get("/scanInventory").then(function (response) {
    			console.log(response);
  		})
  		.catch(function (error) {
    		console.log(error);
  		});
			
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
			<span> </span>
			<button className="btn-default" onClick={this.scanInventory}>Scan Inventory</button>
			
			{inventoryData}

			<div id="container"></div>



			</div>
			)
	}
}