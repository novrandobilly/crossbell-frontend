import React from "react";

import EditIntro from "../Components/EditIntro";
import EditDetails from "../Components/EditDetails";
import EditMission from "../Components/EditMission";

const CompanyProfileForm = (props) => {
  return (
    <>
      <EditIntro FlexClass="FlexContainer" />
      <EditDetails />
      <EditMission />
    </>
  );
};

export default CompanyProfileForm;
