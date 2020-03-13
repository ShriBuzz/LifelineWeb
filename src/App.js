import React from "react";

import NavBar from "./components/NavBar";
import Signup from "./components/Signup";
import Driver from "./screens/Driver";

const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Signup />
      <Driver />
    </React.Fragment>
  );
};

export default App;
