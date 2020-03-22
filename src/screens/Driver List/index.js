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

import * as D from "./styles";

const DriverList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState([]);
  const [contact, setContact] = useState([]);
  const [driverId, setDriverId] = useState([]);

  function getUsers(e) {
    e.preventDefault();
    setLoading(true);
    const nlist = [];
    const elist = [];
    const clist = [];
    const dlist = [];
    axios.get("/driver").then(res => {
      res.data.map(
        c => (
          nlist.push(c.name),
          elist.push(c.email),
          clist.push(c.contact),
          dlist.push(c.driver_id)
        )
      );
      setUsers(nlist);
      setEmail(elist);
      setContact(clist);
      setDriverId(dlist);
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
        <TableContainer style={D.tableContainer}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow style={D.tableHeader}>
                <TableCell align="right" style={D.cell}>
                  Name
                  {users.map(c => {
                    return (
                      <TableRow component="th" scope="row" style={D.row}>
                        {c}{" "}
                      </TableRow>
                    );
                  })}
                </TableCell>
                <TableCell align="right" style={D.cell}>
                  Email
                  {email.map(c => {
                    return (
                      <TableRow component="th" scope="row" style={D.row}>
                        {c}{" "}
                      </TableRow>
                    );
                  })}
                </TableCell>
                <TableCell align="right" style={D.cell}>
                  Contact
                  {contact.map(c => {
                    return (
                      <TableRow component="th" scope="row" style={D.row}>
                        {c}{" "}
                      </TableRow>
                    );
                  })}
                </TableCell>
                <TableCell align="right" style={D.cell}>
                  Driver ID
                  {driverId.map(c => {
                    return (
                      <TableRow component="th" scope="row" style={D.row}>
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

export default DriverList;
