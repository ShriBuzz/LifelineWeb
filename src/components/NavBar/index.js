import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
