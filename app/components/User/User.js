import React, { Component } from 'react';

//--Need to fetch this from the db --//
var userDetails = {
	name: "COLIN M",
	image : "https://avatars3.githubusercontent.com/u/25713169?v=4&s=400"
}

const styles ={ 
	img: {
		width: '100px',
		height: '100px',
		display: 'block',
		borderRadius: '50%',
	}

};

export default class User extends Component {
	render(){
		return(
			<div className="leftBar">
			<div className="container">
			<div className="row">
			<div className="col-md-4">
			<div> 
			<img id="photo" src= {this.props.image} style={styles.img}/>
			<h4 id="userName">{this.props.name}</h4>
			</div>
			</div>
			<div className="col-md-1"></div>
			<div className="col-md-7">
			
			</div>
			</div>
			</div>
			</div>
			);
	}
}