import React from "react";

import {
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Typography,
  Button
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import * as N from "./styles";
import Logo from "../../assets/logo.png";

function NavBar() {
  return (
    <AppBar position="static" style={N.Nav}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon fontSize="large" />
        </IconButton>
        <Typography variant="h4" style={N.Title}>
          <Avatar alt="logo" src={Logo} style={N.Logo} />
          Lifeline App Signup Portal
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
