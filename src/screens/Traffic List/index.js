import React, { useState } from "react";

// packages
import { Box, FormControlLabel, Switch } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// hook
import useTrafficData from "../../hooks/useTrafficData";

// components
import NavBar from "../../components/NavBar";
import TableView from "../../components/TableView";
import Cards from "../../components/Cards";
import Edit from "../../components/Edit";

// styles
import * as T from "./styles";

const TrafficList = () => {
  const [view, setView] = useState(true);
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState();

  useTrafficData();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <NavBar />

      <Box component="div" style={T.container}>
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
          <Box component="div" style={T.cardsContainer}>
            <Cards type="traffic" setOpen={setOpen} setKey={setKey} />
          </Box>
        ) : (
          <TableView />
        )}
      </Box>
      {key ? (
        <Edit
          title={"Edit Traffic info"}
          type="traffic"
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

export default TrafficList;
