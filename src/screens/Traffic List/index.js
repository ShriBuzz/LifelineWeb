import React, { useState, useEffect } from "react";

import {
  Box,
  Table,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  TableRow,
  TableBody,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import axios from "axios";

import NavBar from "../../components/NavBar";
import GetTable from "../../components/GetTable";
import Cards from "../../components/Cards";

import * as T from "./styles";

const TrafficList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/traffic")
      .then((res) => {
        setUsers(Array.from(res.data));
      })
      .catch((e) => {
        return <Typography>{e}</Typography>;
      });
  }, [users.length]);

  return (
    <React.Fragment>
      <NavBar />
      <Box component="div" style={T.container}>
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
