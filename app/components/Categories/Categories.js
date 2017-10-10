import React, { Component } from 'react';
import DrinksList from "../DrinksList/DrinksList";
import Summary from "../Summary/Summary";
import helpers from '../../utils/Helpers';
//--Need to fetch this from the db --//

import axios from 'axios';
//--Need to fetch this from the db --//
var categories = ["vodka", "rum", "whiskey", "gin", "scotch", "tequila", "cordials", "beer"];

var userDetails = {
	name: "COLIN MCDONNELL",
	image : "https://avatars3.githubusercontent.com/u/25713169?v=4&s=400"
}

const styles ={ 
	
	drinksbutton: {
		width: '35%',
		height:'115px',
	},

	sideBar: {
		backgroundColor: '#9B9B9B',
	}
	

};


export default class Categories extends Component {
	constructor(props) {
		super(props);

		this.state = {
			drinkList: [],
			drinkPrice: [],
			drinkUnit: [],
			results: false,
			count: [],
			drink: []
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleOrderClick = this.handleOrderClick.bind(this);
		
	}




	handleClick(event) {

		var thing = event.target.id;
		console.log(thing);
		fetch('/getdrinks/' + thing).then(function(response){
			return response.json();
		}).then(data => {
			// console.log(data);
			let arrName = [];
			let arrPrice = [];
			let arrUnit = [];
			for (var i = 0; i < data.length; i++) {
				arrName.push(data[i].item_name);
				arrPrice.push(data[i].price);
				arrUnit.push(data[i].unit);
			}
			this.setState({drinkList: arrName});
			//this.setState({drinkPrice: arrPrice});
			this.setState({drinkUnit: arrUnit});

			console.log(arrPrice);


		});



	}
	handleOrderClick(event) {
		const item =  event.target.id;
		let found = false;

		fetch('/getprice/' + item).then(function(response){
			return response.json();
		}).then(data => {


			let arrPrice = this.state.drinkPrice;

			//arrPrice.push(data[0].price);

			let index = this.state.drink.indexOf(item);
				arrPrice[index] = data[0].price;
			console.log("Indexxxxxx Price: " + index);

			this.setState({drinkPrice: arrPrice});

			console.log("drinkPrice: " + this.state.drinkPrice);


		});

		for(let i=0;i<this.state.drink.length;i++){
			if(this.state.drink[i] === item){
				this.state.count[i] = this.state.count[i] + 1;
				found =true;
			}
			
		}
		if(!found){
			this.state.drink[this.state.drink.length] = item;
			this.state.count[this.state.count.length] = 1;
		}
		
		
		this.setState({
				
				results : true,
			});
		console.log(this.state.drink);
		
	}
	render(){
		let list;
		let ordersummary;
		if(this.state.results){

			list = <DrinksList drinks={this.state.drinkList} price={this.state.drinkPrice} unit={this.state.drinkUnit} />
			//ordersummary = <Summary />

			//list = <DrinksList drinks={this.state.drinkList}  />
			ordersummary = <Summary drink={this.state.drink} count={this.state.count} price={this.state.drinkPrice}/>
		}



		return(
		<div>
		
			<div className="row">

				<div className="col-md-4">

					<div className="row">
						<div className="col-md-12">
							<img id="photo" src={userDetails.image} />
							<h4 id="userName"> {userDetails.name}</h4>



							{categories.map((item) => (
							<div><button className="btn" id={item} style={styles.button} onClick={this.handleClick} >{item}</button></div>
							))}
							<button className="btn btn-warning" style={styles.button}>LOGOUT</button>
						</div>
					</div>
				</div>

			
				<div className="col-md-8">	
						
							
					{this.state.drinkList.map((item) => 

				// <div><button className="btn " id={item} style={styles.drinksbutton}>{item}</button></div>

						<span className="drinks">
								<button className="btn2" id={item} style={styles.drinksbutton} onClick={this.handleOrderClick} >{item}</button>
						</span>

					)}



				

				<div className="col-md-12">
					{ordersummary}
				</div>

				</div>
				
				
			</div>
		</div>
	

			
			);
	}
}