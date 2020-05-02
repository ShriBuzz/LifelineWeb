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
        <h3>User Not logged in ... </h3>
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

export default Home;
