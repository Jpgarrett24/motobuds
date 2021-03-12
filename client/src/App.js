import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import AuthContext from './auth/AuthContext';
import auth from './api/auth';
import LoginAndReg from './views/LoginAndReg';
import Homescreen from './views/Homescreen';
import TripDetails from './views/TripDetails';

function App() {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const value = useMemo(() => ({ user, setUser, location, setLocation }), [user, setUser, location, setLocation]);

  const getUser = async () => {
    let result = await auth.verify(localStorage.getItem('auth_token'));
    if (result.status >= 400) return;
    return setUser(result.data);
  };

  const getLocation = async () => {
    return setLocation({ latitude: 47.6301955, longitude: -122.50948009999999 })
    let allow = await navigator.permissions.query({ name: "geolocation" });
    if (allow.state === 'denied') return setLocation('not granted');
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  };

  useEffect(() => {
    getUser();
    getLocation();
  }, []);

  // console.log(location);

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
            <Route path="/rides/:_id" component={TripDetails}>
              {!user && <Redirect to="/" />}
            </Route>
          </Switch>
        </div>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;