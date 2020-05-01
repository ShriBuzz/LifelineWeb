import React, { useState } from "react";

import axios from "axios";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Avatar,
  Button,
  Typography,
} from "@material-ui/core";

import Dummy from "../../assets/Profile.jpg";

import * as C from "./styles";
import Edit from "../Edit";

const Cards = ({ users, type }) => {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState();
  let url;

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (url) => {
    axios
      .delete(url)
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((error) => console.log(error));
  };

  const renderAvatar = (key) => {
    if (key === null) {
      return <Avatar style={{ width: 90, height: 90 }} src={Dummy} />;
    } else {
      if (type === "driver") {
        const url = "http://192.168.0.117:5000/get_driver_pic/" + key;
        return <Avatar style={{ width: 90, height: 90 }} src={url} />;
      } else {
        const url = "http://192.168.0.117:5000/get_traffic_pic/" + key;
        return <Avatar style={{ width: 90, height: 90 }} src={url} />;
      }
    }
  };

  if (users == null) {
    return (
      <Card style={C.Container} key={"name"}>
        <CardActionArea style={C.CardContainer}>
          <Avatar style={{ width: 90, height: 90 }} src={Dummy} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Name: -----
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Contact: -----
              <br />
              Email: -----
              <br />
              {type === "driver" ? `Driver ID: -----` : null}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="secondary">
            Edit
          </Button>
          <Button size="small" color="secondary">
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  } else {
    return users.map((data) => (
      <Card style={C.Container} key={data.contact}>
        <CardActionArea style={C.CardContainer}>
          {renderAvatar(data.contact)}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Contact: {data.contact}
              <br />
              Email: {data.email}
              <br />
              {data.driver_id ? `Driver ID: ${data.driver_id}` : null}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              setKey(data.contact.toString());
              setOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              if (type === "driver") {
                url = "/driver/" + data.contact;
              } else {
                url = "/traffic/" + data.contact;
              }
              handleDelete(url);
            }}
          >
            Delete
          </Button>
        </CardActions>
        <Edit
          title="Edit Driver info"
          open={open}
          handleClose={handleClose}
          o_contact={key}
        />
      </Card>
    ));
  }
};

export default React.memo(Cards);
