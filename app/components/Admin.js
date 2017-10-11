import React, {Component} from 'react';
import {browserHistory} from 'react-router';

export default class Admin extends Component {
	constructor(props){
		super(props);
		this.state = this.props.location.state
		if(this.props.location.state == null){
			browserHistory.push("/");
		}
		this.state = {
			data:"data"
		}
		this.logout = this.logout.bind(this);
	}
	getInventory(){
		//this.state.data = "data changed";
	}
	logout(){
		this.setState({user: -1});
		browserHistory.push("/");
	}
	render(){
		return(
			<div>
				<h1>Admin Page</h1>
				<button id="logout" className="btn btn-default"  onClick={this.logout}>Logout</button>
				<button onClick={this.getInventory}>View Inventory</button>
				{this.props.location.state.user}
			</div>
			)
	}
}