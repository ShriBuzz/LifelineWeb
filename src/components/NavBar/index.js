import React, { useContext } from "react";

// packages
import { AppBar, Toolbar, Avatar, Typography, Button } from "@material-ui/core";

// componets
import TemporaryDrawer from "../Drawer";

// routes
import history from "../../navigation/history";

// styles
import * as N from "./styles";

// assets
import Logo from "../../assets/logo.png";

// hook
import { LoginContext } from "../../hooks/LoginContext";

function NavBar() {
  const { success } = useContext(LoginContext);
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
          {success ? "Logout" : "Login"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
