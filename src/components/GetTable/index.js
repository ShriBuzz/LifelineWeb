import React, { useContext } from "react";

// package
import { TableCell, TableRow } from "@material-ui/core";

// hook
import { LoginContext } from "../../hooks/LoginContext";

const GetTable = ({ type }) => {
  const { Dusers, Tusers } = useContext(LoginContext);
  if (Dusers.length === 0 || Tusers.length === 0) {
    return (
      <TableRow key={"name"}>
        <TableCell component="th" scope="row" style={cell}>
          -
        </TableCell>
        <TableCell style={cell}>-</TableCell>
        <TableCell style={cell}>-</TableCell>
        {type === "driver" ? <TableCell style={cell}>-</TableCell> : null}
      </TableRow>
    );
  } else {
    if (type === "driver") {
      return Dusers.map((row) => (
        <TableRow key={row.contact}>
          <TableCell component="th" scope="row" style={cell}>
            {row.name}
          </TableCell>
          <TableCell style={cell}>{row.contact}</TableCell>
          <TableCell style={cell}>{row.email}</TableCell>
          <TableCell style={cell}>{row.driver_id}</TableCell>
        </TableRow>
      ));
    } else {
      return Tusers.map((row) => (
        <TableRow key={row.contact}>
          <TableCell component="th" scope="row" style={cell}>
            {row.name}
          </TableCell>
          <TableCell style={cell}>{row.contact}</TableCell>
          <TableCell style={cell}>{row.email}</TableCell>
        </TableRow>
      ));
    }
  }
};

const cell = {
  textAlign: "center",
};

export default React.memo(GetTable);
