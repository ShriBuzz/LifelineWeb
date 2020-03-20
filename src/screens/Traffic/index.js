import React, { useState } from "react";

import axios from "axios";
import { Box, TextField, Typography, Container } from "@material-ui/core";

import Buttons from "../../components/Button";
import Success from "../../components/Success";
import Failure from "../../components/Failure";

import * as T from "./styles";

const Traffic = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [upload, setUpload] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const handleClose = () => {
    setSuccess(false);
    setFail(false);
  };

  function resetForm() {
    setName("");
    setContact("");
    setEmail("");
    setPassword("");
  }

  function postData(e) {
    e.preventDefault();
    setLoading(true);
    //API call here
    axios
      .post(`/traffic_signup`, {
        // data to be sent
        name,
        email,
        password,
        contact
      })
      .then(response => {
        console.log(response.data);
        setSuccess(true);
        resetForm();
      })
      .catch(error => {
        setFail(true);
        console.log(error);
      });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <Container fluid style={T.bg}>
      <Typography variant="h5" style={T.text}>
        Lets get you registered for Lifeline Traffic App!
      </Typography>
      <Box component="form" style={T.Form}>
        <TextField
          required
          label="Name"
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={e => setName(e.target.value)}
          style={T.input}
        />
        <TextField
          required
          label="Email"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={e => setEmail(e.target.value)}
          style={T.input}
        />
        <TextField
          required
          label="Contact"
          type="number"
          value={contact}
          placeholder="Enter your mobile no."
          onChange={e => setContact(e.target.value)}
          style={T.input}
        />
        <TextField
          required
          label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
          style={T.input}
        />
        <Buttons title="Submit" loading={loading} onSubmit={postData} />
        <Success
          title={"Traffic Officer"}
          Contact={contact}
          Password={password}
          open={success}
          handleClose={handleClose}
        />
        <Failure open={fail} handleClose={handleClose} />
      </Box>
    </Container>
  );
};

export default Traffic;
