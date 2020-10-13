import React, { useState } from "react";

import Login from "./Components/Login";
import Register from "./Components/Register";

const Home = () => {
  const [sign, setSign] = useState(false);

  const toggleSign = () => {
    setSign(!sign);
  };

  return (
    <div>
      <h1>This is a homepage </h1>

      {!sign ? (
        <Login toggled={toggleSign} />
      ) : (
        <Register toggled={toggleSign} />
      )}
    </div>
  );
};

export default Home;
