import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import LoginAndReg from './views/LoginAndReg';
import Homescreen from './views/Homescreen';

function App() {
  console.log(localStorage.getItem('auth_token'));

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LoginAndReg}>
            {localStorage.getItem('auth_token') && <Redirect to="/home" />}
          </Route>
          <Route path="/home" component={Homescreen}>
            {!localStorage.getItem('auth_token') && <Redirect to="/" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
