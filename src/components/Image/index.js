import React, { useState } from "react";

import NavBar from "../NavBar";

import { Box, Avatar, Button } from "@material-ui/core";
import axios from "axios";

import Dummy from "../../assets/Profile.jpg";

const Image = () => {
  const [img, setImg] = useState(null);
  //   const [url, setUrl] = useState();

  function getImg() {
    axios.get("/traffic").then(res => {
      setImg(res.data[0].pic_location);
    });
  }

  function renderAvatar() {
    if (img == null) {
      return <Avatar style={{ width: 100, height: 100 }} src={Dummy} />;
    } else {
      return <Avatar style={{ width: 100, height: 100 }} src={img} />;
    }
  }

  return (
    <React.Fragment>
      <NavBar />
      <Button variant={"default"} color={"secondary"} onClick={() => getImg()}>
        View
      </Button>
      <Box>
        <Avatar src={Dummy} style={{ width: 100, height: 100 }} />
        {renderAvatar()}
      </Box>
    </React.Fragment>
  );
};

export default Image;
