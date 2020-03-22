import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from "./history";

import Login from "../screens/Login";
import Home from "../screens/Home";
import DriverList from "../screens/Driver List";
import TrafficList from "../screens/Traffic List";

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/Home" component={Home} />
        <Route path="/Dlist" component={DriverList} />
        <Route path="/Tlist" component={TrafficList} />
      </Switch>
    </Router>
  );
}

export default Routes;
