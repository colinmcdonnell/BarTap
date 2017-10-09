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
		if(this.props.location.state == null){
			browserHistory.push("/");
		}
	}
	render(){
		return(<div>
			<h1 id="navBar">bartap</h1>
			<User />
      		<Categories />
		</div>);
	}
}