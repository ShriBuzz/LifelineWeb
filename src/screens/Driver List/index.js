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

// styles
import * as D from "./styles";

const DriverList = () => {
  const [view, setView] = useState(true);
  useDriverData();

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
            <Cards type="driver" />
          </Box>
        ) : (
          <TableView type="driver" />
        )}
      </Box>
      <ToastContainer />
    </>
  );
};

export default React.memo(DriverList);
