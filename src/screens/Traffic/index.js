import React, {useEffect, useState} from "react";

// custom hook
import useSubmit from "../../hooks/useSubmit";

// packages
import {
  Box,
  Avatar,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// assets
import Profile from "../../assets/Profile.jpg";

// components
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

  const [contactError, setContactError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [verifyForm, setVerifyForm] = useState(false);

  function renderAvatar() {
    if (url == null) {
      return <Avatar style={T.avatar} alt="Dummy profile" src={Profile} />;
    } else {
      return <Avatar style={T.avatar} alt="Dummy profile" src={url} />;
    }
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  useEffect(()=>{
    if(contactError.length > 0 || emailError.length > 0 || passwordError.length > 0){
      setVerifyForm(true)
    }
    else setVerifyForm(false);
  },[contactError, passwordError, emailError])

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
          style={T.input}
          onChange={(e) => {setEmail(e.target.value)
            if(validateEmail(email)|| e.target.value.length <= 0){
              setEmailError('');
            }
            else{
              setEmailError('Invalid email!');
            }
            }}
            helperText={emailError}
            error={validateEmail(email)|| email.length <= 0?false: true}
        />
        <TextField
          required
          label="Contact"
          type="number"
          value={contact}
          placeholder="Enter your mobile no."
          style={T.input}
          
          onChange={(e) => {          
            setContact(e.target.value)
            if(e.target.value.length === 10){
              setContactError('')
            }else{
              setContactError('Invalid contact!')
            }
          }}
          helperText={contactError}
          error={contactError.length > 0 ? true : false}
        />
        <TextField
          required
          label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          autoComplete="current-password"
          style={T.input}
          onChange={(e) => {
            setPassword(e.target.value)
            if(e.target.value.length < 8){
              setPasswordError('password of min 8 characters required.');
            }
            else{
              setPasswordError('');
            }
          }}
          helperText={passwordError}
          error={password.length < 8 ? true : false}
        />

        <Upload setUpload={setUpload} handlePreview={handlePreview} />

        <Buttons title="Submit" loading={loading} onSubmit={postTrafficData} disabled={verifyForm} />
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
      <ToastContainer />
    </Container>
  );
};

export default Traffic;
