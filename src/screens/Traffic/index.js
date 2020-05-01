import React, { useState } from "react";

import axios from "axios";
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
  const [name, setName] = useState("");
  const [contact, setContact] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [upload, setUpload] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const [url, setUrl] = useState(null);

  const traffic_pic = "/update_traffic_pic/" + contact;

  const handleClose = () => {
    setSuccess(false);
    setFail(false);
  };

  function resetForm() {
    setName("");
    setContact("");
    setEmail("");
    setPassword("");
    setUpload(null);
  }

  const postData = async (e) => {
    e.preventDefault();
    setLoading(true);
    //API call here
    await axios
      .post(`/traffic_signup`, {
        // data to be sent
        name,
        email,
        password,
        contact,
      })
      .then((response) => {
        console.log(response.data);
        handleUpload();
        setSuccess(true);
      })
      .catch((error) => {
        setFail(true);
        console.log(error);
      });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleUpload = async () => {
    if (upload == null) {
      alert("Submit form and choose image before upload.");
    } else {
      let file = new FormData();
      file.append("file", upload, upload.name);
      await axios
        .post(traffic_pic, file, {})
        .then((response) => {
          console.log(response.statusText, "Sent image!!!!!");
          alert("Successfully uploaded image to server.");
          resetForm();
        })
        .catch((error) => {
          setFail(true);
          console.log(error);
        });
    }
  };

  function handlePreview(e) {
    e.preventDefault();
    if (upload == null) {
      alert("Choose an image to preview.");
    } else {
      const objectUrl = URL.createObjectURL(upload);
      setUrl(objectUrl);
    }
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

        <Buttons title="Submit" loading={loading} onSubmit={postData} />
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
