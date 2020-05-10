import React from "react";

import useTrafficData from "../../hooks/useTrafficData";

import {
  Box,
  Table,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  TableBody,
  CircularProgress,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import NavBar from "../../components/NavBar";
import GetTable from "../../components/GetTable";
import Cards from "../../components/Cards";

import * as T from "./styles";

const TrafficList = () => {
  const { users, loading } = useTrafficData();

  if (!users || loading) {
    return (
      <>
        <NavBar />
        <Box component="div" style={T.container}>
          <CircularProgress color="secondary" />
        </Box>
      </>
    );
  }

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
              <GetTable users={users} />
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
