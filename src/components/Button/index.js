import React from "react";

import { Button, CircularProgress } from "@material-ui/core";

import * as B from "./styles";

const Buttons = ({ title, loading, onSubmit, disabled }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      disabled={disabled}
      type="submit"
      style={B.button}
      onClick={e => onSubmit(e)}
    >
      {loading && <CircularProgress size={20} style={{ marginRight: 5 }} />}
      {!loading && title}
    </Button>
  );
};

export default Buttons;
