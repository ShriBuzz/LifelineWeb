import React, { useContext } from "react";

// hooks
import { LoginContext } from "../../hooks/LoginContext";
import useDriverData from "../../hooks/useDriverData";
import useTrafficData from "../../hooks/useTrafficData";

// components
import NavBar from "../../components/NavBar";
import Signup from "../../components/Signup";

const Home = () => {
  useDriverData();
  useTrafficData();
  var { success } = useContext(LoginContext);
  if (success === false) {
    return (
      <>
        <NavBar />
        <p style={error}>User not logged in ... </p>
      </>
    );
  }
  return (
    <>
      <NavBar />
      <Signup />
    </>
  );
};

const error = {
  textAlign: "center",
  fontSize: 28,
  color: "red",
};

export default Home;
