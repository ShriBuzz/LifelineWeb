import React, { useState, useEffect } from 'react';

// packages
import {
  Backdrop,
  Paper,
  TextField,
  Grid,
  Typography,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

// route
import history from '../../navigation/history';

// components
import Buttons from '../../components/Button';
import Failure from '../../components/Failure';

// style
import * as L from './styles';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [fail, setFail] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(success);
  let auth = localStorage.getItem('auth');

  const handleClose = () => {
    setFail(false);
  };

  const handleSubmit = async () => {
    if (name === 'admin' && password === 'admin@123') {
      localStorage.setItem('auth', true);
      history.push('/Home');
    } else {
      setFail(true);
      localStorage.setItem('auth', false);
    }
  };

  useEffect(() => {
    if (auth === 'true') {
      setLoading(true);
      setTimeout(() => {
        history.push('/Home');
      }, 2000);
    }
  }, [auth]);

  return (
    <Backdrop
      open={true}
      color={'#f0f1f2'}
      style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
    >
      <Paper
        elevation='3'
        component='form'
        style={L.container}
        onSubmit={() => handleSubmit()}
      >
        <Typography style={L.Header}>Lifeline Admin Login</Typography>
        {loading && <Typography>Logging in ...</Typography>}
        <Grid container spacing={1} style={L.Form}>
          <Grid item>
            <AccountCircle style={L.Icon} />
          </Grid>
          <Grid item>
            <TextField
              label='Username'
              color={'secondary'}
              required
              autoComplete='username'
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={L.Input}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} style={L.Form}>
          <Grid item>
            <LockIcon style={L.Icon} />
          </Grid>
          <Grid item>
            <TextField
              type='password'
              label='Password'
              color={'secondary'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={L.Input}
            />
          </Grid>
        </Grid>
        <Buttons
          title={'Submit'}
          loading={loading}
          onSubmit={() => handleSubmit()}
        />
        <Failure
          open={fail}
          handleClose={handleClose}
          title='Login Error'
          message='Please enter both name and password.'
        />
      </Paper>
    </Backdrop>
  );
}

export default Login;
