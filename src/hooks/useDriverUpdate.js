import { useState, useEffect } from "react";
import axios from "axios";

const useDriverUpdate = (o_contact) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/driver")
      .then((res) => {
        let user = res.data.filter(function (obj) {
          return obj.contact == o_contact;
        });
        setUser(user[0]);
        setName(user[0].name);
        setContact(user[0].contact);
        setEmail(user[0].email);
        setDriverId(user[0].driver_id);
      })
      .catch((e) => console.log(e));
  }, [o_contact]);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [driver_id, setDriverId] = useState("");
  const url = "http://192.168.0.117:5000/get_driver_pic/" + o_contact;

  const handleUpdate = async (e) => {
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

  return {
    user,
    url,
    handleUpdate,
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

export default useDriverUpdate;
