import React, { Component } from 'react';
import DrinksList from "../DrinksList/DrinksList";
import Summary from "../Summary/Summary";
import helpers from '../../utils/Helpers';
import {browserHistory} from 'react-router';

import axios from 'axios';

const styles ={ 
	
	drinksbutton: {
		width: '35%',
		height:'115px',
	},

	sideBar: {
		backgroundColor: '#9B9B9B',
	}
	

};

var categories = ["vodka", "rum", "whiskey", "gin", "scotch", "tequila", "cordials", "beer"];

export default class Categories extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			drinkList: [],
			drinkPrice: [],
			drinkUnit: [],
			results: false,
			count: [],
			drink: [],
		};
		
		this.handleClick = this.handleClick.bind(this);
		this.handleOrderClick = this.handleOrderClick.bind(this);
		this.clearBtn = this.clearBtn.bind(this);
		
	}

	clearBtn() {
		this.setState({drinkPrice: []});
		this.setState({drinkUnit: []});
		this.setState({count: []});
		this.setState({drink: []});
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

			
			let index = this.state.drink.indexOf(item);
				arrPrice[index] = data[0].price;
			
			this.setState({drinkPrice: arrPrice});

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
		
	}
	render(){
		let list;
		let ordersummary;
		if(this.state.results){


			//list = <DrinksList drinks={this.state.drinkList} price={this.state.drinkPrice} unit={this.state.drinkUnit} />
			//ordersummary = <Summary drink={this.state.drink} count={this.state.count} price={this.state.drinkPrice}/>

			//list = <DrinksList drinks={this.state.drinkList} price={this.state.drinkPrice} unit={this.state.drinkUnit} />
			ordersummary = <Summary clear={this.clearBtn} drink={this.state.drink} count={this.state.count} price={this.state.drinkPrice}/>

		}

		return(
		<div>
		
			<div className="row">

				<div className="col-md-4">

					<div className="row">
						<div className="col-md-12">

						<div id="gray">
								<img id="photo" src={this.props.image} />
								<h4 id="userName"> {this.props.name}</h4>
							</div>

							{categories.map((item) => (
							<div><button className="btn" id={item} style={styles.button} onClick={this.handleClick} >{item}</button></div>
							))}
							<button className="btn3" style={styles.button} onClick={this.props.logout}>LOGOUT</button>
						</div>
					</div>
				</div>

			
				<div className="col-md-8">	
					{this.state.drinkList.map((item) => 
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