import React, { useState, useEffect } from "react";

import {
  Box,
  Table,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  TableBody,
  Typography,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import axios from "axios";

import NavBar from "../../components/NavBar";
import GetTable from "../../components/GetTable";
import Cards from "../../components/Cards";

import * as D from "./styles";

const DriverList = () => {
  const [users, setUsers] = useState([]);
  console.log(users.length);

  useEffect(() => {
    axios
      .get("/driver")
      .then((res) => {
        setUsers(Array.from(res.data));
      })
      .catch((e) => {
        return <Typography>{e}</Typography>;
      });
  }, [users.length]);

  if (!users) {
    return <Typography>Loading ... </Typography>;
  }

  return (
    <React.Fragment>
      <NavBar />
      <Box component="div" style={D.container}>
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
