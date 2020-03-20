import React from "react";

import { Button, CircularProgress } from "@material-ui/core";

import * as B from "./styles";

const Buttons = ({ title, loading, onSubmit }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      disabled={loading}
      style={B.button}
      onClick={() => onSubmit()}
    >
      {loading && (
        <CircularProgress color="#000" size={18} style={{ marginRight: 5 }} />
      )}
      {title}
    </Button>
  );
};

export default Buttons;
