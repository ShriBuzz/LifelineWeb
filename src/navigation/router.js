import React, { useState, useMemo } from 'react';

// package
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// hook
import { LoginContext } from '../hooks/LoginContext';

// routes
import history from './history';
import PrivateRoute from './PrivateRoute';

// screens
import Login from '../screens/Login';
import Home from '../screens/Home';
import DriverList from '../screens/Driver List';
import TrafficList from '../screens/Traffic List';

function Routes() {
  const [success, setSuccess] = useState(true);
  const [Dusers, setDusers] = useState([]);
  const [Tusers, setTusers] = useState([]);
  const providerValue = useMemo(
    () => ({
      success,
      setSuccess,
      Dusers,
      setDusers,
      Tusers,
      setTusers,
    }),
    [success, setSuccess, Dusers, setDusers, Tusers, setTusers]
  );
  return (
    <Router history={history} basename='/'>
      <Switch>
        <LoginContext.Provider value={providerValue}>
          <Route path='/' exact component={Login} />
          <PrivateRoute exact path='/Home'>
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path='/Dlist'>
            <DriverList />
          </PrivateRoute>
          <PrivateRoute exact path='/Tlist'>
            <TrafficList />
          </PrivateRoute>
        </LoginContext.Provider>
      </Switch>
    </Router>
  );
}

export default Routes;
