import React, { useState } from "react";

import {
  Box,
  Avatar,
  TextField,
  Typography,
  Container
} from "@material-ui/core";
import axios from "axios";

import Buttons from "../../components/Button";
import Upload from "../../components/Upload";
import Success from "../../components/Success";
import Failure from "../../components/Failure";

import Profile from "../../assets/Profile.jpg";

import * as D from "./styles";

const Driver = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [driver_id, setDriverId] = useState("");
  const [password, setPassword] = useState("");
  const [upload, setUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const [url, setUrl] = useState(null);

  const driver_pic = "/driver_pic/" + contact;

  const handleClose = () => {
    setSuccess(false);
    setFail(false);
  };

  function resetForm() {
    setName("");
    setContact("");
    setEmail("");
    setDriverId("");
    setPassword("");
    setUpload(null);
  }

  function postData(e) {
    e.preventDefault();
    setLoading(true);

    //API call here
    axios
      .post(
        `/driver_signup`,
        {
          // data to be sent
          name,
          email,
          password,
          driver_id,
          contact
        },
        {}
      )
      .then(response => {
        console.log(response.data);
        setSuccess(true);
        // resetForm();
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
    if (upload == null) {
      alert("Submit form and choose image before upload.");
    } else {
      let file = new FormData();
      file.append("file", upload, upload.name);
      axios
        .post(driver_pic, file, {})
        .then(response => {
          console.log(response.statusText, "Sent image!!!!!");
          alert("Successfully uploaded image to server.");
          resetForm();
        })
        .catch(error => {
          setFail(true);
          console.log(error);
        });
    }
  }

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
      return <Avatar style={D.avatar} alt="Dummy profile" src={Profile} />;
    } else {
      return <Avatar style={D.avatar} alt="Dummy profile" src={url} />;
    }
  }

  return (
    <Container fluid style={D.bg}>
      <Typography variant="h5" style={D.text}>
        Lets get you registered for Lifeline Driver App!
      </Typography>
      {renderAvatar()}
      <Box component="form" style={D.Form}>
        <TextField
          required
          label="Name"
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={e => setName(e.target.value)}
          style={D.input}
        />
        <TextField
          required
          label="Email"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={e => setEmail(e.target.value)}
          style={D.input}
        />
        <TextField
          required
          label="Contact"
          type="number"
          value={contact}
          placeholder="Enter your mobile no."
          onChange={e => setContact(e.target.value)}
          style={D.input}
        />
        <TextField
          required
          label="Driver Id"
          type="text"
          value={driver_id}
          placeholder="Enter your driver id"
          onChange={e => setDriverId(e.target.value)}
          style={D.input}
        />
        <TextField
          required
          label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
          style={D.input}
        />

        <Upload
          setUpload={setUpload}
          handleUpload={handleUpload}
          handlePreview={handlePreview}
        />

        {/* submit button */}
        <Buttons title="Submit" loading={loading} onSubmit={postData} />
        <Success
          title={"Ambulance Driver"}
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

export default Driver;
