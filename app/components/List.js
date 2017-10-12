import React from "react";
import {browserHistory} from 'react-router';

var loginarray= "";
var Link = require("react-router").Link;

var buttonsarray = ["0","1","2","3","4","5","6","7","8","9"];

const imgURL = 'https://unsplash.com/photos/sX7oITk-UXE';

var background = "https://images.unsplash.com/photo-1495399396117-a3763646f854?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop="

var cover = {
  backgroundImage: 'url(' + background + ')',
  backgroundSize: 'cover',
  overflow: 'hidden',
}

export default class List extends React.Component{

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
      if(data.emp_no > -1 && data.emp_no !== '0000'){
        console.log("data here: " + data.emp_no);
        browserHistory.push({
          pathname: '/main',
          state: { user: data.emp_no,
                   user_name: data.name,
                   user_image: data.image }
        });  
      } 
      else if(data.emp_no > -1 && data.emp_no == '0000'){
        console.log("data here: " + data.emp_no);
        browserHistory.push({
          pathname: '/admin',
          state: { user: data.emp_no,
                   user_name: data.name,
                   user_image: data.image
                  }
        });  
      }
       else {
        this.setState({error: "Employee Not found"});
      }
    });
  };

  concat(event){
    var buttonclicked = event.target.value;
    loginarray = loginarray + buttonclicked;
    console.log(loginarray);

  };

loginClear() {
  loginarray = "";
}

  render(){

//  const buttonoptions = this.props.buttons;

  return (

        <div style={cover} className="cover">

          <h1 id="navBar"> bartap </h1>

            <div className="error"> <strong>{this.state.error}</strong> </div>

            <div className="row">
              <div className="col-sm-4"> </div>
                <div className="col-sm-4">

                  
                    {buttonsarray.map(item => (
                      
                        <button value={item} className="num-bg zero " id={item} onClick={this.concat}>{item}</button>
                      
                    ))}
                    <button id="loginsubmit" className="num-bg" onClick={this.login}>Submit</button>

                    <button className="num-bg" id="loginClear" onClick={this.loginClear}>Clear</button>
                  
                  
                </div>
              <div className="col-sm-4"> </div>

            </div>
            

        </div>

  );
};
}
