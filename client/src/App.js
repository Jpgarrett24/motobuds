import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginAndReg from './views/LoginAndReg';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LoginAndReg} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
