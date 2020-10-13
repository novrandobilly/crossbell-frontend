import React from "react";

import CompanyMap from "../Components/CompanyMap";

const CompanyDetails = (props) => {
  let Company = [
    {
      id: "SSS001",
      logo:
        "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
      name: "Orbal Network Operator",
      size: "2000-5000",
      industry: "Special Support Section",
      address: "Jl.Sisingamangaraja no.166, tanjung duren, jakarta selatan",
      websites: "www.github.com",
      detail:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      mission:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];
  return <CompanyMap items={Company} />;
};

export default CompanyDetails;
