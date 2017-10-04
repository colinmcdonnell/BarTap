import React, { Component } from 'react';
import User from './User/User';
import Categories from './Categories/Categories'


export default class Button extends Component {
	render(){
		return(<div>
			<h1 align="center">BARTAP</h1>
			<User />
      		<Categories />
		</div>);
	}
}