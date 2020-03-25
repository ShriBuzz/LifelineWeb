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

import * as T from "./styles";

const TrafficList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const list = [];

  function getUsers(e) {
    e.preventDefault();
    setLoading(true);
    axios.get("/traffic").then(res => {
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
      <Box component="div" style={T.container}>
        <Buttons title={"View"} loading={loading} onSubmit={getUsers} />
        <TableContainer component={Paper} style={T.table}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={T.head}>Name</TableCell>
                <TableCell align="right" style={T.head}>
                  Contact
                </TableCell>
                <TableCell align="right" style={T.head}>
                  Email
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <GetTable users={users} cells={3} />
            </TableBody>
          </Table>
        </TableContainer>
        <Box component="div" style={{ width: "100%", textAlign: "center" }}>
          <Cards users={users} />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default TrafficList;
