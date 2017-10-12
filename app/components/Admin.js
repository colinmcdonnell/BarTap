import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import User from "./User/User";
import Table from "./Table/Table";

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
		}
		if(this.props.location.state == null){
			browserHistory.push("/");
		}
		
		this.logout = this.logout.bind(this);
		this.getInventory = this.getInventory.bind(this);
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
			{inventoryData}
			</div>
			)
	}
}