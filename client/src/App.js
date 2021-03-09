import React, { useMemo, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import AuthContext from './auth/AuthContext';
import LoginAndReg from './views/LoginAndReg';
import Homescreen from './views/Homescreen';

function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <AuthContext.Provider value={value}>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LoginAndReg}>
              {user && <Redirect to="/home" />}
            </Route>
            <Route path="/home" component={Homescreen}>
              {!user && <Redirect to="/" />}
            </Route>
          </Switch>
        </div>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;