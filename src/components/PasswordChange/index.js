import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// package
import {
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core';

// styles
import * as P from './styles';

const PasswordChange = ({ title, open, handleClose, o_contact, type }) => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePassChange = (contact) => {
    if (password.length < 8) {
      toast.error('Invalid entry.');
      return;
    } else {
      if (type === 'driver') {
        axios
          .put(`${process.env.REACT_APP_BASE_URL}driver_password/` + contact, {
            password,
          })
          .then((res) => {
            toast.success('succesfully updated!');
            setPassword('');
            handleClose();
          })
          .catch((e) => console.log(e));
      } else {
        axios
          .put(`${process.env.REACT_APP_BASE_URL}traffic_password/` + contact, {
            password,
          })
          .then((res) => {
            toast.success('succesfully updated!');
            setPassword('');
            handleClose();
          })
          .catch((e) => console.log(e));
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <Box component='form' style={P.FormContainer}>
          <Box style={P.Form}>
            <TextField
              label='password'
              type='text'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length < 8) {
                  setPasswordError('password of min 8 characters required.');
                } else {
                  setPasswordError('');
                }
              }}
              style={P.Input}
              helperText={passwordError}
              error={password.length < 8 ? true : false}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => {
            handlePassChange(o_contact);
          }}
          color='secondary'
        >
          Save
        </Button>
        <Button onClick={handleClose} color='secondary'>
          Exit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordChange;
