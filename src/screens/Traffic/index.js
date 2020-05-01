import React from "react";
// custom hook
import useSubmit from "../../hooks/useSubmit";

import {
  Box,
  Avatar,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import Profile from "../../assets/Profile.jpg";

import Upload from "../../components/Upload";
import Buttons from "../../components/Button";
import Success from "../../components/Success";
import Failure from "../../components/Failure";

import * as T from "./styles";

const Traffic = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    contact,
    setContact,
    password,
    setPassword,
    postTrafficData,
    url,
    setUpload,
    handlePreview,
    loading,
    success,
    handleClose,
    fail,
  } = useSubmit();

  function renderAvatar() {
    if (url == null) {
      return <Avatar style={T.avatar} alt="Dummy profile" src={Profile} />;
    } else {
      return <Avatar style={T.avatar} alt="Dummy profile" src={url} />;
    }
  }

  return (
    <Container style={T.bg}>
      <Typography variant="h5" style={T.text}>
        Lets get you registered for Lifeline Traffic App!
      </Typography>
      {renderAvatar()}
      <Box component="form" style={T.Form}>
        <TextField
          required
          label="Name"
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          style={T.input}
        />
        <TextField
          required
          label="Email"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          style={T.input}
        />
        <TextField
          required
          label="Contact"
          type="number"
          value={contact}
          placeholder="Enter your mobile no."
          onChange={(e) => setContact(e.target.value)}
          style={T.input}
        />
        <TextField
          required
          label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          style={T.input}
        />

        <Upload setUpload={setUpload} handlePreview={handlePreview} />

        <Buttons title="Submit" loading={loading} onSubmit={postTrafficData} />
        <Success
          title={"Traffic Officer"}
          Contact={contact}
          Password={password}
          open={success}
          handleClose={handleClose}
        />
        <Failure
          open={fail}
          handleClose={handleClose}
          title={"Failed Registration!"}
          message={
            "Error processing data. Please fill all (*) required data and try again."
          }
        />
      </Box>
    </Container>
  );
};

export default Traffic;
