import React, { useState } from "react";

import { Box, TextField, Typography, Container } from "@material-ui/core";

import Buttons from "../../components/Button";

import * as T from "./styles";

const Traffic = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [upload, setUpload] = useState();
  const [loading, setLoading] = useState(false);

  function fetchData() {
    setLoading(true);
    //API call here
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  return (
    <Container fluid style={T.bg}>
      <Typography variant="h5" style={T.text}>
        Lets get you registered for Lifeline Traffic App!
      </Typography>
      <Box component="form" style={T.Form}>
        <TextField
          required
          id="standard"
          label="Name"
          type="text"
          value={name}
          placeholder="Enter your name"
          autoComplete="text"
          style={T.input}
        />
        <TextField
          required
          id="standard"
          label="Email"
          type="email"
          value={email}
          placeholder="Enter your email"
          autoComplete="email"
          style={T.input}
        />
        <TextField
          required
          id="standard"
          label="Contact"
          type="number"
          value={contact}
          placeholder="Enter your mobile no."
          autoComplete="number"
          style={T.input}
        />
        <TextField
          required
          id="standard"
          label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          autoComplete="current-password"
          style={T.input}
        />
        <Buttons title="Submit" loading={loading} onSubmit={fetchData} />
      </Box>
    </Container>
  );
};

export default Traffic;
