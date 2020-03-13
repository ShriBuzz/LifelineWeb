import React from "react";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import * as D from "./styles";

const Driver = () => {
  return (
    <Container fluid style={D.bg}>
      <Typography variant="h5" style={D.text}>
        Lets get you registered for Lifeline Driver App!
      </Typography>
      <Box component="form" style={D.Form}>
        <TextField
          required
          id="standard"
          label="Name"
          type="text"
          placeholder="Enter your name"
          autoComplete="text"
          style={D.input}
        />
        <TextField
          required
          id="standard"
          label="Email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          style={D.input}
        />
        <TextField
          required
          id="standard"
          label="Contact"
          type="number"
          placeholder="Enter your mobile no."
          autoComplete="number"
          style={D.input}
        />
        <TextField
          required
          id="standard"
          label="Driver Id"
          type="text"
          placeholder="Enter your driver id"
          autoComplete="text"
          style={D.input}
        />
        <TextField
          required
          id="standard"
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          style={D.input}
        />
      </Box>
    </Container>
  );
};

export default Driver;
