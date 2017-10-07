import React from "react";

var buttonsarray = ["0","1","2","3","4","5","6","7","8","9"];

export default class Buttons extends Component {
	render(){
		return(
			<button>{buttonsarray[1]}</button>
			)
	}
}