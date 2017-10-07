import React from 'react';
import { Route, 
         Router,
         hashHistory,
         browserHistory,
         IndexRoute,
         
       } from 'react-router';
import Main from "../components/Main";
import List from "../components/List";



// Export the Routes
module.exports = (

  // The high level component is the Router component

  <Router history={browserHistory}>
    <Route path="/" component={List}>

      {/* If user selects Info or Chat show the appropriate component */}
      <Route path="/main" component={Main} />


      {/* If user selects any other path... we get the Info Route */}
      <IndexRoute component={List} />

    </Route>
  </Router>

);
