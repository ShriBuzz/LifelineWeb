import React, { useState } from "react";

import {
  Box,
  Table,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  TableBody
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import axios from "axios";

import NavBar from "../../components/NavBar";
import Buttons from "../../components/Button";

import * as D from "./styles";

const DriverList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const list = [];

  function getUsers(e) {
    e.preventDefault();
    setLoading(true);
    axios.get("/driver").then(res => {
      res.data.map(c => list.push(c));
      setUsers(list);
    });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  function table() {
    if (users == null) {
      return (
        <TableRow key={"name"}>
          <TableCell component="th" scope="row" style={D.cell}>
            -
          </TableCell>
          <TableCell style={D.cell}>-</TableCell>
          <TableCell style={D.cell}>-</TableCell>
          <TableCell style={D.cell}>-</TableCell>
        </TableRow>
      );
    } else {
      return users.map(row => (
        <TableRow key={row.name}>
          <TableCell component="th" scope="row" style={D.cell}>
            {row.name}
          </TableCell>
          <TableCell style={D.cell}>{row.contact}</TableCell>
          <TableCell style={D.cell}>{row.email}</TableCell>
          <TableCell style={D.cell}>{row.driver_id}</TableCell>
        </TableRow>
      ));
    }
  }

  return (
    <React.Fragment>
      <NavBar />
      <Box component="div" style={D.container}>
        <Buttons title={"View"} loading={loading} onSubmit={getUsers} />
        <TableContainer component={Paper} style={D.table}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={D.head}>Name</TableCell>
                <TableCell align="right" style={D.head}>
                  Contact
                </TableCell>
                <TableCell align="right" style={D.head}>
                  Email
                </TableCell>
                <TableCell align="right" style={D.head}>
                  Driver ID
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{table()}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </React.Fragment>
  );
};

export default DriverList;
