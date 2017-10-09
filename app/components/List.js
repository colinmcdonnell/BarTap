import React from "react";
import {browserHistory} from 'react-router';

var loginarray="";
var Link = require("react-router").Link;

var buttonsarray = ["0","1","2","3","4","5","6","7","8","9"];

class List extends React.Component{

  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      error: ""
    }
  }

  login(event){
  console.log("clicked");
  console.log("submitted array: "+loginarray);

    fetch('/login/'+loginarray).then(function(response){
      if (response.ok){
        console.log(response);
        return response.json();  
      } else {
        console.log("user not available");
        return {emp_no: -1}
      }
      
    }).then(data => {
      loginarray="";
      this.setState({error: ""});
      if(data.emp_no > -1){
        console.log("data here: " + data.emp_no);
        browserHistory.push({
          pathname: '/main',
          state: { user: data.emp_no }
        });  
      } else {
        this.setState({error: "Employee Not found"});
      }
    });
  };

  concat(event){
    var buttonclicked = event.target.value;
    loginarray = loginarray + buttonclicked;
    console.log(loginarray);

  };




  render(){

// const List = props => {
  // Using the filter method, we can create a new array containing only groceries which haven't been purchased
  const buttonoptions = this.props.buttons;

  return (
    <div>
      <strong>{this.state.error}</strong>
    <ul className="list-group">
      {buttonsarray.map(item => (
        <div className="rows">
          <button value={item} className="num-bg zero" id={item} onClick={this.concat}>{item}</button>
        </div>
      ))}
      <button id="loginsubmit" onClick={this.login}>Submit</button>
    </ul>
    <strong>{this.state.error}</strong>
    </div>
  );
};
}

export default List;








 // <li className="list-group-item" value={item}>
 //    <button className="btn btn-default">{item}</button>
 //  </li>