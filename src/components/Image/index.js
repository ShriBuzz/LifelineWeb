import React, { useState } from "react";

import NavBar from "../NavBar";

import { Box, Avatar, Button } from "@material-ui/core";
import axios from "axios";

import Dummy from "../../assets/Profile.jpg";

const Image = () => {
  const [contact, setContact] = useState([]);

  function getImg() {
    axios.get("/driver").then(res => {
      var i;
      const list = [];
      for (i = 0; i < res.data.length; i++) {
        list.push(res.data[i].contact);
      }
      setContact(list);
    });
  }

  function renderAvatar() {
    if (contact.length === 0) {
      return <Avatar style={{ width: 100, height: 100 }} src={Dummy} />;
    } else {
      return contact.map(data => {
        const url = "http://192.168.0.117:5000/get_driver_pic/" + data;
        return <Avatar style={{ width: 100, height: 100 }} src={url} />;
      });
      // return <Avatar style={{ width: 100, height: 100 }} src={Dummy} />;
    }
  }

  return (
    <React.Fragment>
      <NavBar />
      <Button color={"secondary"} onClick={() => getImg()}>
        View
      </Button>
      <Box>{renderAvatar()}</Box>
    </React.Fragment>
  );
};

export default Image;
