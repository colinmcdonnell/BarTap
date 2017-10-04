import React, { Component } from 'react';
import DrinksList from "../DrinksList/DrinksList";
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
		height:'60px',
		
	},
	drinksbutton: {
		width: '100px',
		height:'100px',
		margin: "5px",
		float: 'left'
	}

};

export default class Categories extends Component {
	constructor(props) {
		super(props);

		this.state = {
			drinkList: [],
			results: false
		};

		this.handleClick = this.handleClick.bind(this);
		
	}

	handleClick(event) {
		const category =  event.target.id;
		let drinks =[];
		//---Need to chage this to fetch from db ---/
		if(category == "vodka"){
			drinks=["titos", "monopolowa", "deep eddy", "absolute", "stolichnaya", "kettle one", "grey goose", "belvedere"];
			this.setState({
				drinkList : drinks,
				results : true,
			});
		}
		else {
			drinks = ["a", "b", "c"];
			this.setState({
				drinkList : drinks,
				results : true,
			});
		}
	}
	render(){
		let list;
		if(this.state.results){
			list = <DrinksList drinks={this.state.drinkList} />
		}
		return(<div>
			<div>
			<div className="container">
			<div className="row">
			<div className="col-md-4">
			{categories.map((item) => (
				<div><button className="btn btn-default" id={item} style={styles.button} onClick={this.handleClick} >{item}</button></div>
				))}
			</div>
			
			<div className="col-md-8">
			{this.state.drinkList.map((item) => 
				<div><button className="btn " id={item} style={styles.drinksbutton} >{item}</button></div>
				)}
			</div>
			</div>
			</div>
			</div>
			</div>);
	}
}