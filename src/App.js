import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Link
} from "react-router-dom";
import ChefView from './components/chef-components/Chef-view';
import WaiterView from './components/waiter-components/Waiter-view';
import SignInView from './components/sign-in-components/Sign-in-view';


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/chef">
            <ChefView />
          </Route>
          <Route path="/waiter">
            <WaiterView />
          </Route>
          <Route path="/">
            <SignInView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
