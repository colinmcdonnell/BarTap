import React, { Component } from 'react';
import User from './User/User';
import Categories from './Categories/Categories';
import {browserHistory} from 'react-router';
// Include React
// var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;



export default class Main extends Component {
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
		let user = this.state == null? <div></div>:<User name={this.state.user_name} image={this.state.user_image}/>
		return(<div>
			<h1 id="navBar">bartap</h1>
			<button id="logout" className="btn btn-default" onClick={this.logout}>Logout</button>
			 {user}
      		<Categories />
		</div>);
	}
}