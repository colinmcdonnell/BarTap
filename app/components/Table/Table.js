import React, { Component } from 'react';

const styles ={ 
	

};

export default class Table extends Component {
	render(){
		return(
			<table className="table table-bordered table-hover table-responsive">
				<thead>
				<tr>
				<th>ITEM NAME</th>
				<th>ITEM TYPE</th>
				<th>CURRENT VALUE</th>
				<th>INVENTORY LOWER VALUE</th>
				</tr>
				</thead>
				<tbody>{this.props.data.map(function(item, key) {

					return (
						<tr key = {key}>
						<td>{item.item_name}</td>
						<td>{item.type}</td>
						<td>{item.current}</td>
						<td>{item.inventory_lower}</td>
						</tr>
						)

				})}</tbody>
				</table>
			
			);
	}
}