import React from "react";

import JobDetailMap from "../../components/JobDetailMap";

const JobDetails = (props) => {
  let JobDetails = [
    {
      id: "SSS001",
      logo:
        "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
      name: "Orbal Network Operator",
      city: "Jakarta Selatan",
      jobName: "Software-Engineer Intern",
      detail:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      payment: "Rp.123",
      level: "Entry Level",
      employment: "Intern",
      industry: "IT Consultant",
      jobFunction: "Engineer",
      benefits: "Medical Insurance",
      datePosted: "3",
    },
  ];
  return (
    <>
      <JobDetailMap items={JobDetails} />
    </>
  );
};

export default JobDetails;