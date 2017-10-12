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

		console.log(this.props.price);
	
		this.handleClick = this.handleClick.bind(this);
	}

	render(){
		let d = this.props.drinks.map(drink => <p>drink</p>)
		return({d})
		return(
			<div className="drinkList">
			<div className="container">
			<div className="row">
			<div className="col-md-4">
			<div>
			<img src= {userDetails.image} style={styles.img}/>
			<h4>{userDetails.name}</h4>
			</div>
			</div>
			<div className="col-md-1"></div>
			<div className="col-md-7">
			</div>
			</div>
			</div>
			</div>
			);

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