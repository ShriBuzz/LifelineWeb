import React, { useState } from "react";

import { Box, TextField, Typography, Container } from "@material-ui/core";

import Buttons from "../../components/Button";

import * as D from "./styles";

const Driver = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState();
  const [email, setEmail] = useState("");
  const [driver_id, setDriverId] = useState("");
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
          value={name}
          placeholder="Enter your name"
          autoComplete="text"
          style={D.input}
        />
        <TextField
          required
          id="standard"
          label="Email"
          type="email"
          value={email}
          placeholder="Enter your email"
          autoComplete="email"
          style={D.input}
        />
        <TextField
          required
          id="standard"
          label="Contact"
          type="number"
          value={contact}
          placeholder="Enter your mobile no."
          autoComplete="number"
          style={D.input}
        />
        <TextField
          required
          id="standard"
          label="Driver Id"
          type="text"
          value={driver_id}
          placeholder="Enter your driver id"
          autoComplete="text"
          style={D.input}
        />
        <TextField
          required
          id="standard"
          label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          autoComplete="current-password"
          style={D.input}
        />
        <Buttons title="Submit" loading={loading} onSubmit={fetchData} />
      </Box>
    </Container>
  );
};

export default Driver;
