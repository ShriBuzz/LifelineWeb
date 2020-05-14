import React, { useState } from "react";
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

import axios from "axios";

const Edit = ({
  title,
  open,
  handleClose,
  o_contact,
  o_name,
  o_email,
  o_driverid,
}) => {
  const [name, setName] = useState(o_name);
  const [contact, setContact] = useState(o_contact);
  const [email, setEmail] = useState(o_email);
  const [driver_id, setDriverId] = useState(o_driverid);
  const url = "https://lifeline-rats.herokuapp.com/get_driver_pic/" + o_contact;

  function handleUpdate(e) {
    e.preventDefault();

    axios
      .put(
        `/driver/` + o_contact,
        {
          // data to be sent
          name,
          email,
          driver_id,
          contact,
        },
        {}
      )
      .then((response) => {
        console.log(response.data);
        alert("succesfully updated!");
        window.location.reload(false);
      })
      .catch((error) => {
        alert("failed to update!");
        console.log(error);
      });
  }

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
              label={o_name}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={E.Input}
            />
            <TextField
              label={o_contact}
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              style={E.Input}
            />
            <TextField
              label={o_email}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={E.Input}
            />
            <TextField
              label={o_driverid}
              type="text"
              value={driver_id}
              onChange={(e) => setDriverId(e.target.value)}
              style={E.Input}
            />
          </Box>
        </Box>
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
