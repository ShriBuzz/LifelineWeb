import React, { useState } from "react";

import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableBody
} from "@material-ui/core";
import axios from "axios";

import NavBar from "../../components/NavBar";
import Buttons from "../../components/Button";

import * as T from "./styles";

const TrafficList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState([]);
  const [contact, setContact] = useState([]);

  function getUsers(e) {
    e.preventDefault();
    setLoading(true);
    const nlist = [];
    const elist = [];
    const clist = [];
    axios.get("/traffic").then(res => {
      res.data.map(
        c => (nlist.push(c.name), elist.push(c.email), clist.push(c.contact))
      );
      setUsers(nlist);
      setEmail(elist);
      setContact(clist);
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
        <TableContainer style={T.tableContainer}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow style={T.tableHeader}>
                <TableCell align="right" style={T.cell}>
                  Name
                  {users.map(c => {
                    return (
                      <TableRow component="th" scope="row" style={T.row}>
                        {c}{" "}
                      </TableRow>
                    );
                  })}
                </TableCell>
                <TableCell align="right" style={T.cell}>
                  Email
                  {email.map(c => {
                    return (
                      <TableRow component="th" scope="row" style={T.row}>
                        {c}{" "}
                      </TableRow>
                    );
                  })}
                </TableCell>
                <TableCell align="right" style={T.cell}>
                  Contact
                  {contact.map(c => {
                    return (
                      <TableRow component="th" scope="row" style={T.row}>
                        {c}{" "}
                      </TableRow>
                    );
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </React.Fragment>
  );
};

export default TrafficList;
