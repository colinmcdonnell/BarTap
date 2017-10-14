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
		}
		if(this.props.location.state == null){
			browserHistory.push("/");
		}
		
		this.logout = this.logout.bind(this);
		this.getInventory = this.getInventory.bind(this);
		this.genChart = this.genChart.bind(this);
		this.scanInventory = this.scanInventory.bind(this);
		this.importInventory = this.importInventory.bind(this);
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

	genChart(){
		this.setState({data: [],
				result: false});
		this.setState({scan: false});
		this.setState({imported: false});

		if(this.state.chart === false){
			axios.get('/sales')
  			.then(function (response) {

    			
					console.log("res length" + response.data.length);
		let salesData = [];

			for (var i = 0; i < response.data.length; i++) {
				let tempArr = [];
				let item_name = response.data[i].item_name;
				let units_sold = response.data[i].units_sold;
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

	scanInventory(){
		this.setState({data: [],
				result: false});
		this.setState({chart: false});
		this.setState({scan: true});
		this.setState({imported: false});
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
		axios.get("/importInventory").then(function (response) {
    			console.log(response);
  		})
  		.catch(function (error) {
    		console.log(error);
  		});
	}

	render(){
		let data = this.state.result;
		let inventoryData = "";
		let scanCheck = this.state.scan;
		let scanMessage ="";
		let importCheck = this.state.imported;
		let importMessage ="";
		if(data){
			inventoryData = <Table data={this.state.data} />
		}

		if(scanCheck){
			scanMessage = "Inventory Scanned!";
		} else {
			scanMessage = "";
		}
		if(importCheck){
			importMessage = "Inventory Imported!";
		} else {
			importMessage = "";
		}


		
		return(
			<div>
			<div className="row">
                <div className="col-md-12">
                    <h1 id="navBar"> admin bartap </h1>
                </div>
                <div className="row">        
                    <div className="col-md-4">
                        <div id="btn">
                            <img id="photo" src={this.state.image}/>
                            
                            <h4 id="userName">{this.state.name}</h4>
                        </div>
                    </div>
                
                    
                </div>
            </div> 
            <div className="row">
                <div className="col-md-4">
                    <button className="btn" onClick={this.getInventory}>View Inventory</button>
                    <button className="btn" onClick={this.genChart}>Generate Chart</button>
					<button className="btn" onClick={this.scanInventory}>Scan Inventory</button>
					<button className="btn" onClick={this.importInventory}>import Inventory</button>
                    <button id="logout" className="btn3"  onClick={this.logout}>Logout</button>
                </div>
                <div className ="col-md-6">
                {inventoryData}
                <h2>{scanMessage}</h2>
                <h2>{importMessage}</h2>
                <div id="container"></div>
                </div>

            </div>
			</div>
			)
	}
}