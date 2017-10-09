import React from 'react';
import { Route, 
         Router,
         hashHistory,
         browserHistory,
         IndexRoute,
         
       } from 'react-router';
import Main from "../components/Main";
import List from "../components/List";

module.exports = (
  <Router history={browserHistory}>
    <Route path="/" component={List}>
      <IndexRoute component={List} />
    </Route>
    <Route path="/main" component={Main}></Route>
  </Router>
);
