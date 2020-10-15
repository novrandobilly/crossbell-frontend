import React from "react";

import EditIntro from "../Components/EditIntro";
import EditDetails from "../Components/EditDetails";
import EditMission from "../Components/EditMission";

const CompanyProfileForm = (props) => {
  return (
    <>
      <EditIntro />
      <EditDetails />
      <EditMission />
    </>
  );
};

export default CompanyProfileForm;
