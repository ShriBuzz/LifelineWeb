import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
import useDriverData from "../../hooks/useDriverData";

const GetTable = ({ type }) => {
  const { users, loading } = useDriverData();
  if (users.length === 0 || loading) {
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
    console.log("table");
    return users.map((row) => (
      <TableRow key={row.contact}>
        <TableCell component="th" scope="row" style={cell}>
          {row.name}
        </TableCell>
        <TableCell style={cell}>{row.contact}</TableCell>
        <TableCell style={cell}>{row.email}</TableCell>
        {type === "driver" ? (
          <TableCell style={cell}>{row.driver_id}</TableCell>
        ) : null}
      </TableRow>
    ));
  }
};

const cell = {
  textAlign: "center",
};

export default React.memo(GetTable);
