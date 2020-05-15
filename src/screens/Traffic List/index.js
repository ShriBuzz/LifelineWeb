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

// styles
import * as T from "./styles";

const TrafficList = () => {
  const [view, setView] = useState(true);
  useTrafficData();

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
            <Cards />
          </Box>
        ) : (
          <TableView />
        )}
      </Box>
      <ToastContainer />
    </>
  );
};

export default TrafficList;
