import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import AuthContext from './auth/AuthContext';
import auth from './api/auth';
import LoginAndReg from './views/LoginAndReg';
import Homescreen from './views/Homescreen';

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const getUser = async () => {
    let result = await auth.verify(localStorage.getItem('auth_token'));
    if (result.status >= 400) return;
    return setUser(result.data);
  }
  useEffect(() => {
    getUser();
  }, []);

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