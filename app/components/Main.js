import React, { Component } from 'react';
import User from './User/User';
import Categories from './Categories/Categories'


// const styles ={ 
// 	navBar: {
// 		width: '100%',
// 		height: '25px',
// 		display: 'block',
// 		background-color: #2E2E2E
// 	}

// };

export default class Main extends Component {
	render(){
		return(<div>
			<h1 id="navBar">bartap</h1>
			<User />
      		<Categories />
		</div>);
	}
}