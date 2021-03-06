import React, { useState, useEffect, useContext } from 'react';

// hooks
import useUpdate from '../../hooks/useUpdate';
import { LoginContext } from '../../hooks/LoginContext';

// package
import {
  Box,
  Avatar,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core';

import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';

import Upload from '../Upload';

// styles
import * as E from './styles';

const Edit = React.memo(
  ({ title, open, setOpen, handleClose, o_contact, type }) => {
    const {
      user,
      url,
      urls,
      handleDriverUpdate,
      handleTrafficUpdate,
      name,
      setName,
      email,
      setEmail,
      contact,
      setContact,
      driver_id,
      setDriverId,
      loading,
      setUpload,
      handlePreview,
      generateDownload,
    } = useUpdate(o_contact, type);

    const [cropToggle, setCropToggle] = useState(false);
    const [contactError, setContactError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [verifyForm, setVerifyForm] = useState(false);
    const [croppedArea, setCroppedArea] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const { Dusers, Tusers } = useContext(LoginContext);
    const [imgSrc, setSrc] = useState('');

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
      setCroppedArea(croppedAreaPixels);
    };

    const handleCrop = (e) => {
      setCropToggle(false);
      generateDownload(url, croppedArea);
    };

    useEffect(() => {
      if (contactError.length > 0 || emailError.length > 0) {
        setVerifyForm(true);
      } else setVerifyForm(false);
    }, [contactError, emailError]);

    useEffect(() => {
      if (type === 'driver') {
        let user = Dusers.filter(function (e) {
          return e.contact === o_contact;
        });
        console.log(user);
        setSrc(`data:image/jpeg;base64,${user[0].pic}`);
      } else {
        let user = Tusers.filter(function (e) {
          return e.contact === o_contact;
        });
        setSrc(`data:image/jpeg;base64,${user[0].pic}`);
      }
    }, [type, o_contact, Dusers, Tusers]);

    function chooseUpdate(e) {
      if (type === 'driver') {
        handleDriverUpdate(e);
        setOpen(false);
      } else {
        handleTrafficUpdate(e);
        setOpen(false);
      }
    }

    function renderAvatar() {
      if (imgSrc || url !== null) {
        return (
          <Avatar
            style={{ width: 90, height: 90, marginBottom: 18 }}
            src={url ? url : imgSrc}
          />
        );
      } else {
        return (
          <Avatar
            style={{ width: 90, height: 90, marginBottom: 18 }}
            src={urls}
          />
        );
      }
    }

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    return (
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>

        {cropToggle && (
          <div
            style={{
              ...E.containerCropper,
              pointerEvents: url ? 'auto' : 'none',
            }}
          >
            {url ? (
              <>
                <div style={E.cropper}>
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
                    style={{
                      width: '60%',
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      margin: 'auto',
                    }}
                  />
                </div>

                <Button
                  variant='contained'
                  color='secondary'
                  onClick={(e) => handleCrop(e)}
                  style={E.cropButton}
                >
                  Crop
                </Button>
              </>
            ) : null}
          </div>
        )}

        <DialogContent>
          {loading || !user ? (
            <CircularProgress color='secondary' />
          ) : (
            <Box component='form' style={E.FormContainer}>
              {/* <Avatar style={{ width: 90, height: 90 }} src={urls} /> */}
              <Box component='div' style={E.Upload}>
                {renderAvatar()}
                <Upload
                  setUpload={setUpload}
                  handlePreview={handlePreview}
                  setCropToggle={setCropToggle}
                />
              </Box>

              <Box style={E.Form}>
                <TextField
                  label='name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={E.Input}
                />
                <TextField
                  label='contact'
                  type='text'
                  value={contact}
                  style={E.Input}
                  onChange={(e) => {
                    setContact(e.target.value);
                    if (e.target.value.length === 10) {
                      setContactError('');
                    } else {
                      setContactError('Invalid contact!');
                    }
                  }}
                  helperText={contactError}
                  error={contactError.length > 0 ? true : false}
                />
                <TextField
                  label='email'
                  type='text'
                  value={email}
                  style={E.Input}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (validateEmail(email) || e.target.value.length <= 0) {
                      setEmailError('');
                    } else {
                      setEmailError('Invalid email!');
                    }
                  }}
                  helperText={emailError}
                  error={
                    validateEmail(email) || email.length <= 0 ? false : true
                  }
                />
                {type === 'driver' ? (
                  <TextField
                    label='driverid'
                    type='text'
                    value={driver_id}
                    onChange={(e) => setDriverId(e.target.value)}
                    style={E.Input}
                  />
                ) : null}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => chooseUpdate(e)}
            color='secondary'
            disabled={verifyForm}
          >
            Save
          </Button>
          <Button onClick={handleClose} color='secondary'>
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default Edit;
