import React, { useContext } from "react";
import { LoginContext } from "../../hooks/LoginContext";

import NavBar from "../../components/NavBar";
import Signup from "../../components/Signup";

const Home = () => {
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
