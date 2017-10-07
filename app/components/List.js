import React from "react";
import { Route, Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
// var loginarray = [];
var loginarray="";
// Include React
// var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

var buttonsarray = ["0","1","2","3","4","5","6","7","8","9"];

// Whenever we try to render an array containing JSX, React knows to render each JSX element separately
class List extends React.Component{

  login(event){
  console.log("clicked");
  console.log("submitted array: "+loginarray);

    fetch('/login/'+loginarray).then(function(response){
      console.log(response);

    }); 




  //   fetch('/login', {
  //   method: 'Get',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     loginarray: 'loginarray',
  //   })
  // })




  };

  concat(event){
    var buttonclicked = event.target.value;
    loginarray = loginarray + buttonclicked;
    console.log(loginarray);

  };




  render(){

// const List = props => {
  // Using the filter method, we can create a new array containing only groceries which haven't been purchased
  const buttonoptions = ["0","1","2","3","4","5","6","7","8","9"];
  return (
    <div>
    <ul className="list-group">
      {buttonoptions.map(item => (
        <div className="rows">
          <button value={item} className="num-bg zero" id={item} onClick={this.concat}>{item}</button>

        </div>
      ))}
      <button id="loginsubmit" onClick={this.login}>Submit</button>
    </ul>
    </div>
  );




};
}

export default List;








 // <li className="list-group-item" value={item}>
 //    <button className="btn btn-default">{item}</button>
 //  </li>