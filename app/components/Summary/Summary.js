import React, { Component } from 'react';

const styles ={ 
	
	operations: {
		width: '100px',
		height:'50px',
		margin: "5px",
		float: 'center'
	},
};


export default class Summary extends Component {

	
	render(){
		let totalBeforeTax = 0;
		let total = 0;
		let tax = 0;

		let drinks = this.props.drink;
		let count = this.props.count;
		let price = this.props.price;
		
		for(let i=0; i<count.length; i++){
			totalBeforeTax = totalBeforeTax + (count[i]*price[i]);
		}
		tax = 0.0825 * totalBeforeTax;
		total = totalBeforeTax + tax;
		return(
			<div>
			<h3>Order Summary</h3>
			<div className="container">
			<div className="row">
			<div className="col-md-2">
			<h4>Item</h4>
			{this.props.drink.map((item) => (
				<div>{item}</div>
				))}
			</div>
			<div className="col-md-1">
			<h4>Count</h4>
			{this.props.count.map((item) => (
				<div>{item}</div>
				))}
			</div>
			<div className="col-md-1">
			<h4>Price</h4>
			{this.props.price.map((item) => (
				<div>{`$${item}`}</div>
				))}
			</div>
			</div>
			<div className="row">
			<div className="col-md-2">
			<h5>Tax(8.25%)</h5>
			</div>
			<div className="col-md-1"></div>
			<div className="col-md-1">
			<h5>{`$${tax.toFixed(2)}`}</h5>
			</div>
			</div>
			<div className="row">
			<div className="col-md-2">
			<h5>Total</h5>
			</div>
			<div className="col-md-1"></div>
			<div className="col-md-1">
			<h5>{`$${total.toFixed(2)}`}</h5>
			</div>
			</div>
			<div className="row">
			<button className="btn btn-warning" style={styles.operations}>EDIT</button>
			<button className="btn btn-warning" style={styles.operations}>CLEAR</button>
			<button className="btn btn-warning" style={styles.operations}>SUBMIT</button>
			</div>
			</div>
			</div>
			);
	}
}