import React from "react";
import { TableCell, TableRow } from "@material-ui/core";

const GetTable = ({ users }) => {
  if (users == null) {
    return (
      <TableRow key={"name"}>
        <TableCell component="th" scope="row" style={cell}>
          -
        </TableCell>
        <TableCell style={cell}>-</TableCell>
        <TableCell style={cell}>-</TableCell>
        <TableCell style={cell}>-</TableCell>
      </TableRow>
    );
  } else {
    return users.map(row => (
      <TableRow key={row.name}>
        <TableCell component="th" scope="row" style={cell}>
          {row.name}
        </TableCell>
        <TableCell style={cell}>{row.contact}</TableCell>
        <TableCell style={cell}>{row.email}</TableCell>
        <TableCell style={cell}>{row.driver_id}</TableCell>
      </TableRow>
    ));
  }
};

const cell = {
  textAlign: "center"
};

export default GetTable;
