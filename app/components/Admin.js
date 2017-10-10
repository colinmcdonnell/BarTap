import React, {Component} from 'react';
import {browserHistory} from 'react-router';

export default class Admin extends Component {
	constructor(props){
		super(props);
		this.state = this.props.location.state
		if(this.state == null){
			browserHistory.push("/");
		}
		this.logout = this.logout.bind(this);
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
			
			</div>
			)
	}
}