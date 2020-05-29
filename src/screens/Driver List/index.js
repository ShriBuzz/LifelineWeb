import React, { useState } from "react";

// packages
import { Box, FormControlLabel, Switch } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// hooks
import useDriverData from "../../hooks/useDriverData";

// components
import NavBar from "../../components/NavBar";
import TableView from "../../components/TableView";
import Cards from "../../components/Cards";
import Edit from "../../components/Edit";

// styles
import * as D from "./styles";

const DriverList = () => {
  const [view, setView] = useState(true);
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState();

  useDriverData();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <NavBar />

      <Box component="div" style={D.container}>
        <FormControlLabel
          control={
            <Switch
              checked={view}
              onChange={() => setView(!view)}
              name={view ? "Cards" : "Table"}
            />
          }
          label={view ? "Cards" : "Table"}
        />
        {view ? (
          <Box component="div" style={D.cardsContainer}>
            <Cards type="driver" setOpen={setOpen} setKey={setKey} />
          </Box>
        ) : (
          <TableView type="driver" />
        )}
      </Box>
      {key ? (
        <Edit
          title={"Edit Driver info"}
          type="driver"
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          o_contact={key}
        />
      ) : null}

      <ToastContainer />
    </>
  );
};

export default React.memo(DriverList);
