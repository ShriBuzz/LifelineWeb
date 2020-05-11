import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useUpdate = (o_contact, type) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [driver_id, setDriverId] = useState("");
  const [user, setUser] = useState(null);
  const [urls, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const getDriver = useCallback((o_contact) => {
    axios
      .get("/driver/" + o_contact)
      .then((res) => {
        let user = res.data;
        console.log(res.data);
        setUser(user);
        setName(user.name);
        setContact(user.contact);
        setEmail(user.email);
        setDriverId(user.driver_id);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (type === "driver") {
      setUrl(process.env.REACT_APP_BASE_URL + "get_driver_pic/" + o_contact);
      setLoading(true);
      getDriver(o_contact);
    } else {
      setUrl(process.env.REACT_APP_BASE_URL + "/get_traffic_pic/" + o_contact);
      setLoading(true);
      axios
        .get("/traffic/" + o_contact)
        .then((res) => {
          let user = res.data;
          setUser(user);
          setName(user.name);
          setContact(user.contact);
          setEmail(user.email);
          setLoading(false);
        })
        .catch((e) => console.log(e));
    }
  }, [getDriver, o_contact, type]);

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
    loading,
  };
};

export default useUpdate;
