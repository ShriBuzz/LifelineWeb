import React, { useState } from "react";
import {
  Box,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button
} from "@material-ui/core";

import * as E from "./styles";

const Edit = ({
  title,
  open,
  handleClose,
  o_contact,
  o_name,
  o_email,
  o_driverid
}) => {
  const [name, setName] = useState(o_name);
  const [contact, setContact] = useState(o_contact);
  const [email, setEmail] = useState(o_email);
  const [driver_id, setDriverId] = useState(o_driverid);
  const url = "http://192.168.0.117:5000/get_driver_pic/" + o_contact;

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogContent>
        <Box component="form" style={E.FormContainer}>
          <Avatar style={{ width: 90, height: 90 }} src={url} />
          <Box style={E.Form}>
            <TextField
              label="Name"
              type="text"
              value={o_name}
              onChange={e => setName(e.target.value)}
              style={E.Input}
            />
            <TextField
              label="Contact"
              type="text"
              value={o_contact}
              onChange={e => setContact(e.target.value)}
              style={E.Input}
            />
            <TextField
              label="Email"
              type="text"
              value={o_email}
              onChange={e => setEmail(e.target.value)}
              style={E.Input}
            />
            <TextField
              label="Driver Id"
              type="text"
              value={o_driverid}
              onChange={e => setDriverId(e.target.value)}
              style={E.Input}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
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
