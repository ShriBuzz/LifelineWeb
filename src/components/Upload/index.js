import React from "react";

import { Box, Button, IconButton, Tooltip } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

import * as U from "./styles";

const Upload = ({ setUpload, handleUpload }) => {
  return (
    <Box component="div" style={U.row}>
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        name="file"
        onChange={e => setUpload(e.target.files[0])}
        style={{ display: "none" }}
      />
      <Tooltip
        disableFocusListener
        disableTouchListener
        title="Fill all above data before upload"
        placement="top"
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={e => handleUpload(e)}
        >
          Upload
        </Button>
      </Tooltip>
      <label htmlFor="icon-button-file">
        <Tooltip
          disableFocusListener
          disableTouchListener
          title="Choose image"
          placement="top"
        >
          <IconButton
            color="secondary"
            aria-label="upload picture"
            component="span"
            style={U.icon}
          >
            <PhotoCamera />
          </IconButton>
        </Tooltip>
      </label>
    </Box>
  );
};

export default Upload;
