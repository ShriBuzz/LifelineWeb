import React, { useState } from "react";

import { Backdrop, Box, TextField, Grid, Typography } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";

import history from "../../navigation/history";

import Buttons from "../../components/Button";
import Failure from "../../components/Failure";

import * as L from "./styles";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [fail, setFail] = useState(false);

  const handleClose = () => {
    setFail(false);
  };

  function handleSubmit() {
    if (name === "admin" && password === "admin") {
      history.push("/Home");
    } else {
      setFail(true);
    }
  }

  return (
    <Backdrop open={true} color={"#f0f1f2"}>
      <Box component="div" style={L.container}>
        <Typography style={L.Header}>Lifeline Admin Login</Typography>
        <Grid container spacing={1} style={L.Form}>
          <Grid item>
            <AccountCircle style={L.Icon} />
          </Grid>
          <Grid item>
            <TextField
              label="Username"
              color={"secondary"}
              required
              value={name}
              onChange={e => setName(e.target.value)}
              style={L.Input}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} style={L.Form}>
          <Grid item>
            <LockIcon style={L.Icon} />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              label="Password"
              color={"secondary"}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={L.Input}
            />
          </Grid>
        </Grid>
        <Buttons title={"Submit"} onSubmit={handleSubmit} />
        <Failure open={fail} handleClose={handleClose} />
      </Box>
    </Backdrop>
  );
}

export default Login;
