import React from "react";

import { AppBar, Toolbar, Avatar, Typography, Button } from "@material-ui/core";

import TemporaryDrawer from "../Drawer";
import history from "../../navigation/history";
import * as N from "./styles";
import Logo from "../../assets/logo.png";

function NavBar() {
  function handleLogout(e) {
    e.preventDefault();
    history.push("/");
  }

  return (
    <AppBar position="static" style={N.Nav}>
      <Toolbar>
        <TemporaryDrawer />
        <Typography variant="h4" style={N.Title}>
          <Avatar alt="logo" src={Logo} style={N.Logo} />
          Lifeline App Signup Portal
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
