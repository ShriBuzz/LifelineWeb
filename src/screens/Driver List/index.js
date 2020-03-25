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
import GetTable from "../../components/GetTable";
import Cards from "../../components/Cards";

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
            <TableBody>
              <GetTable users={users} />
            </TableBody>
          </Table>
        </TableContainer>
        <Box component="div" style={{ width: "100%", textAlign: "center" }}>
          <Cards users={users} type="driver" />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default React.memo(DriverList);
