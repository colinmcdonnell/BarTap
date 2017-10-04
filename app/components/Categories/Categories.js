import React, { Component } from 'react';

//--Need to fetch this from the db --//
var categories = ["vodka", "rum", "whiskey", "gin", "scotch", "tequila", "cordials", "beer"];

const styles ={ 
	img: {
    	width: '100px',
 		height: '100px',
 		display: 'block',
 		borderRadius: '50%',
	},
	button: {
		width: '150px',
		height:'50px',
	}

};

export default class Categories extends Component {
	render(){
		return(<div>
			{categories.map((item) => (
				<div><button className="btn btn-default" key={item} style={styles.button}>{item}</button></div>
				))}
		</div>);
	}
}