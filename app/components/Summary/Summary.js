import React, { Component } from 'react';

const styles ={ 
	
	operations: {
		width: '100px',
		height:'50px',
		
	},
};


export default class Summary extends Component {
	render(){
		let drinks = this.props.drink;
		let count = this.props.count;
		return(
			<div>
				<h3 id="orderSum">Order Summary</h3>
					
						
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
					

						
							<button className="btn btn-warning" style={styles.operations}>EDIT</button>
							<button className="btn btn-warning" style={styles.operations}>CLEAR</button>
							<button className="btn btn-warning" style={styles.operations}>SUBMIT</button>
						
				</div>
			</div>
						);
	}
}