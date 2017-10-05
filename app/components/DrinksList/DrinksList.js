import React, { Component } from 'react';

const styles ={ 
	
	drinksbutton: {
		width: '100px',
		height:'100px',
		margin: "5px",
		float: 'left'
	},
};

export default class DrinksList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drinkList: this.props.drinks
		};
	}

	render(){
		return(
			<div>
			{this.state.drinkList.map((item) => (
				<div><button className="btn" id={item} style={styles.drinksbutton} key={item}  >{item}</button></div>
				))}
			
			</div>
			);
	}
}