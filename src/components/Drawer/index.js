import React, { useState } from "react";
import { Drawer, Divider, IconButton, Typography } from "@material-ui/core";

import history from "../../navigation/history";
import ListIcon from "../ListIcon";

import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import TrafficIcon from "@material-ui/icons/Traffic";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

import * as D from "./styles";

export default function TemporaryDrawer() {
  const [left, setLeft] = useState(false);

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setLeft({ left, [anchor]: open });
  };

  function routeHome(e) {
    e.preventDefault();
    history.push("/Home");
  }

  function routeDlist(e) {
    e.preventDefault();
    history.push("/Dlist");
  }

  function routeTlist(e) {
    e.preventDefault();
    history.push("/Tlist");
  }

  function handleLogout(e) {
    e.preventDefault();
    history.push("/");
  }

  const list = anchor => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{ width: 250 }}
    >
      <Typography style={D.title}>Menu</Typography>
      <Divider />
      <ListIcon text={"Home"} icon={<HomeIcon />} onSubmit={routeHome} />
      <ListIcon
        text={"Driver List"}
        icon={<DriveEtaIcon />}
        onSubmit={routeDlist}
      />
      <ListIcon
        text={"Traffic List"}
        icon={<TrafficIcon />}
        onSubmit={routeTlist}
      />
      <ListIcon
        text={"Logout"}
        icon={<MeetingRoomIcon />}
        onSubmit={handleLogout}
      />
    </div>
  );

  return (
    <div>
      {["left"].map(anchor => (
        <React.Fragment key={anchor}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={left[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
