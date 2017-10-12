import React, { Component } from 'react';

const styles ={ 
	
	operations: {
		width: '100px',
		height:'50px',
		
	},
};

export default class Summary extends Component {

	constructor(props) {
		super(props);
		this.state = {
			total: 0,
			tax: 0,
			totalBeforeTax: 0,
			drinks: this.props.drink,
			count: this.props.count,
			price: this.props.price
		}
		this.total = 0;
		this.submitBtn = this.submitBtn.bind(this);
	}

	submitBtn(event){
		console.log('submitBtn');
	}
	
	render(){
		let totalBeforeTax = 0;
		let total = 0;
		let tax = 0;

		let drinks = this.props.drink;
		let count = this.props.count;
		let price = this.props.price;


		
		for(let i=0; i<count.length; i++){
			totalBeforeTax = totalBeforeTax + (count[i] * price[i]);
		}

		tax = 0.0825 * totalBeforeTax;
		total = totalBeforeTax + tax;

		return(
			<div>

				<div> <h3 id="orderSum">Order Summary</h3> </div>

				
					<div className ="row">
					
						
							<div className="col-sm-4">
								<h4>Item</h4>
								{drinks.map((item) => (
									<div>{item}</div>
								))}
							</div>

							<div className="col-sm-2">
								<h4>Count</h4>
								{count.map((item) => (
								<div>{item}</div>
								))}
							</div>

							<div className="col-sm-2">
									<h4>Price</h4>
									{price.map((item) => (
									<div>{`$${item.toFixed(2)}`}</div>
									))}
							</div>
					</div>
					
					

					<div className="row">

						{drinks.length > 0 ? <div className="col-md-4">
							<h5>Tax(8.25%)</h5>
						</div> : null}

						<div className="col-md-2"> 
						</div>

						{tax > 0 ? <div className="col-md-2">
							<h5>{`$${tax.toFixed(2)}`}</h5>
						</div> : null}

					</div>

					

					<div className="row">

						<div className="col-md-4">
							<h5>Total</h5>
						</div>

						<div className="col-md-2">
						</div>

						<div className="col-md-2">
							<h5>{`$${total.toFixed(2)}`}</h5>
						</div>

					</div>


					<div className="row">
					
							<button className="btn btn-warning" style={styles.operations} onClick={this.props.clear}>CLEAR</button>
							<button className="btn btn-warning" style={styles.operations} onClick={this.submitBtn}>SUBMIT</button>
					</div>
						



			</div>
						);
	}
}