import React, { useState } from "react";

import axios from "axios";
import {
  Box,
  Button,
  Avatar,
  TextField,
  Typography,
  Container,
  IconButton
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import Profile from "../../assets/Profile.jpg";

import Buttons from "../../components/Button";
import Success from "../../components/Success";
import Failure from "../../components/Failure";

import * as T from "./styles";

const Traffic = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [upload, setUpload] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const [url, setUrl] = useState(null);

  const traffic_pic = "/traffic_pic/" + contact;

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
      })
      .catch(error => {
        setFail(true);
        console.log(error);
      });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  function handleUpload(e) {
    e.preventDefault();
    const objectUrl = URL.createObjectURL(upload);
    setUrl(objectUrl);
    let file = new FormData();
    file.append("file", upload, upload.name);

    axios
      .post(traffic_pic, file, {})
      .then(response => {
        console.log(response.statusText, "Sent image!!!!!");
        resetForm();
      })
      .catch(error => {
        console.log(error);
      });
  }

  function renderAvatar() {
    if (url == null) {
      return <Avatar style={T.avatar} alt="Dummy profile" src={Profile} />;
    } else {
      return <Avatar style={T.avatar} alt="Dummy profile" src={url} />;
    }
  }

  return (
    <Container fluid style={T.bg}>
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

        {/* image upload */}
        <Box component="div" style={T.row}>
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            name="file"
            onChange={e => setUpload(e.target.files[0])}
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={e => handleUpload(e)}
          >
            Upload
          </Button>
          <label htmlFor="icon-button-file">
            <IconButton
              color="secondary"
              aria-label="upload picture"
              component="span"
              style={T.icon}
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>

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
