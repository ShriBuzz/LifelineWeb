import React from "react";

import useDriverUpdate from "../../hooks/useDriverUpdate";

import {
  Box,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "@material-ui/core";

import * as E from "./styles";

const Edit = ({ title, open, handleClose, o_contact }) => {
  const {
    user,
    url,
    handleUpdate,
    name,
    setName,
    email,
    setEmail,
    contact,
    setContact,
    driver_id,
    setDriverId,
  } = useDriverUpdate(o_contact);

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogContent>
        {!user ? (
          `Loading...`
        ) : (
          <Box component="form" style={E.FormContainer}>
            <Avatar style={{ width: 90, height: 90 }} src={url} />
            <Box style={E.Form}>
              <TextField
                label="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={E.Input}
              />
              <TextField
                label="contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                style={E.Input}
              />
              <TextField
                label="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={E.Input}
              />
              <TextField
                label="driverid"
                type="text"
                value={driver_id}
                onChange={(e) => setDriverId(e.target.value)}
                style={E.Input}
              />
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => handleUpdate(e)} color="secondary">
          Save
        </Button>
        <Button onClick={handleClose} color="secondary">
          Exit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(Edit);
