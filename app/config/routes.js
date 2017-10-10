import React from 'react';
import { Route, 
         Router,
         hashHistory,
         browserHistory,
         IndexRoute,
         
       } from 'react-router';
import Main from "../components/Main";
import List from "../components/List";
import Admin from "../components/Admin";

module.exports = (
  <Router history={browserHistory}>
    <Route path="/" component={List}>
      <IndexRoute component={List} />
    </Route>
    <Route path="/main" component={Main}></Route>
    <Route path="/admin" component={Admin}></Route>
  </Router>
);
