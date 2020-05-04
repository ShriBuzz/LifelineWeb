import { useState, useEffect } from "react";
import axios from "axios";

const useUpdate = (o_contact, type) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [driver_id, setDriverId] = useState("");
  const [user, setUser] = useState(null);
  const [urls, setUrl] = useState("");

  useEffect(() => {
    if (type === "driver") {
      setUrl("http://192.168.0.117:5000/get_driver_pic/" + o_contact);
      axios
        .get("/driver")
        .then((res) => {
          let user = res.data.filter(function (obj) {
            return obj.contact.toString() === o_contact;
          });
          setUser(user[0]);
          setName(user[0].name);
          setContact(user[0].contact);
          setEmail(user[0].email);
          setDriverId(user[0].driver_id);
        })
        .catch((e) => console.log(e));
    } else {
      setUrl("http://192.168.0.117:5000/get_traffic_pic/" + o_contact);
      axios
        .get("/traffic")
        .then((res) => {
          let user = res.data.filter(function (obj) {
            return obj.contact.toString() === o_contact;
          });
          setUser(user[0]);
          setName(user[0].name);
          setContact(user[0].contact);
          setEmail(user[0].email);
        })
        .catch((e) => console.log(e));
    }
  }, [o_contact, type]);

  const handleDriverUpdate = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `/driver/` + o_contact,
        {
          // data to be sent
          name,
          email,
          driver_id,
          contact,
        },
        {}
      )
      .then((response) => {
        console.log(response.data);
        alert("succesfully updated!");
        window.location.reload(false);
      })
      .catch((error) => {
        alert("failed to update!");
        console.log(error);
      });
  };

  const handleTrafficUpdate = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `/traffic/` + o_contact,
        {
          // data to be sent
          name,
          email,
          contact,
        },
        {}
      )
      .then((response) => {
        console.log(response.data);
        alert("succesfully updated!");
        window.location.reload(false);
      })
      .catch((error) => {
        alert("failed to update!");
        console.log(error);
      });
  };

  return {
    user,
    urls,
    handleDriverUpdate,
    handleTrafficUpdate,
    name,
    setName,
    email,
    setEmail,
    contact,
    setContact,
    driver_id,
    setDriverId,
  };
};

export default useUpdate;
