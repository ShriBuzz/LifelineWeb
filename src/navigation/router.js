import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from "./history";

import Login from "../screens/Login";
import Home from "../screens/Home";

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/Home" component={Home} />
      </Switch>
    </Router>
  );
}

export default Routes;
