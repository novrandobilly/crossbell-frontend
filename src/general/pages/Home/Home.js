import React, { useState } from "react";

import CompanyForm from "./Components/CompanyForm";
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
        <Register toggled={toggleSign} />
      ) : (
        <CompanyForm toggled={toggleSign} />
      )}
    </div>
  );
};

export default Home;
