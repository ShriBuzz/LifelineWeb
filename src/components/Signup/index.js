import React from "react";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import * as S from "./styles";

function Signup() {
  return (
    <ButtonGroup
      variant="contained"
      aria-label="outlined secondary button group"
      style={S.container}
    >
      <Button style={S.button}>Driver Signup</Button>
      <Button style={S.button}>Traffic Signup</Button>
    </ButtonGroup>
  );
}

export default Signup;
