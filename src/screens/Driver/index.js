import React, {useEffect, useState} from "react";

// custom hooks
import useSubmit from "../../hooks/useSubmit";

// packages
import {
  Box,
  Button,
  Avatar,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";

// components
import Buttons from "../../components/Button";
import Upload from "../../components/Upload";
import Success from "../../components/Success";
import Failure from "../../components/Failure";

// assets
import Profile from "../../assets/Profile.jpg";

import * as D from "./styles";

const Driver = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    contact,
    setContact,
    driver_id,
    setDriverId,
    password,
    setPassword,
    postData,
    url,
    setUpload,
    handlePreview,
    loading,
    success,
    handleClose,
    fail,
    generateDownload
  } = useSubmit();

  const [cropToggle, setCropToggle] = useState(false);
  const [contactError, setContactError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [verifyForm, setVerifyForm] = useState(false);
  const [croppedArea, setCroppedArea] = useState(null);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  
  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };
  
  const handleCrop = (e) => {
    setCropToggle(false);
    generateDownload(url, croppedArea);
  }

  function renderAvatar() {
    if (url == null) {
      return <Avatar style={D.avatar} alt="Dummy profile" src={Profile} />;
    } else {
      return <Avatar style={D.avatar} alt="Dummy profile" src={url} />;
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
    <Container style={D.bg}>
      <Typography variant="h5" style={D.text}>
        Lets get you registered for Lifeline Driver App!
      </Typography>
      {renderAvatar()}
      <Box component="form" style={D.Form}>
        <TextField
          required
          label="Name"
          type="text"
          autoComplete="username"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          style={D.input}
        />
        <TextField
          required
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => {setEmail(e.target.value)
          if(validateEmail(email)|| e.target.value.length <= 0){
            setEmailError('');
          }
          else{
            setEmailError('Invalid email!');
          }
          }}
          style={D.input}
          helperText={emailError}
          error={validateEmail(email)|| email.length <= 0?false: true}
        />
        <TextField
          required
          label="Contact"
          type="number"
          autoComplete="tel"
          value={contact}
          placeholder="Enter your mobile no."
          onChange={(e) => {          
            setContact(e.target.value)
            if(e.target.value.length === 10){
              setContactError('')
            }else{
              setContactError('Invalid contact!')
            }
          }}
          style={D.input}
          helperText={contactError}
          error={contactError.length > 0 ? true : false}
        />
        <TextField
          required
          label="Driver Id"
          type="text"
          autoComplete="name"
          value={driver_id}
          placeholder="Enter your driver id"
          onChange={(e) => setDriverId(e.target.value)}
          style={D.input}
        />
        <TextField
          required
          label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          autoComplete="current-password"
          onChange={(e) => {
            setPassword(e.target.value)
            if(e.target.value.length < 8){
              setPasswordError('password of min 8 characters required.');
            }
            else{
              setPasswordError('');
            }
          }}
          style={D.input}
          helperText={passwordError}
          error={password.length < 8 ? true : false}
        />

        {
          cropToggle && (
            <div style={D.containerCropper}>
				{url ? (
					<>
						<div style={D.cropper}>
							<Cropper
								image={url}
								crop={crop}
								zoom={zoom}
								aspect={1}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
							/>
						</div>

						<div className='slider'>
							<Slider
								min={1}
								max={3}
								step={0.1}
								value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
                style={
                  {
                    width: '60%',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    margin: 'auto',
                  }
                }
							/>
						</div>

            <Button
            variant="outlined"
            color="secondary"
            onClick={(e) => handleCrop(e)}
            style={D.cropButton}
          >
            Crop
          </Button>
					</>
				) : null}
			</div>
          )
        }

        

        <Upload setUpload={setUpload} handlePreview={handlePreview} setCropToggle={setCropToggle} />

        {/* submit button */}
        <Buttons title="Submit" loading={loading} onSubmit={postData} disabled={verifyForm}/>
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
      <ToastContainer />
    </Container>
  );
};

export default Driver;
