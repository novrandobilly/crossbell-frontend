import React, { useState } from "react";

import EditIntro from "../Components/EditIntro";
import EditDetails from "../Components/EditDetails";
import EditMission from "../Components/EditMission";
import classes from "./CompanyProfileForm.module.css";

const CompanyProfileForm = (props) => {
  const [push, setPush] = useState(true);

  const pushHandler = () => {
    setPush(!push);
  };

  return (
    <div className={classes.Form}>
      <EditIntro
        FlexClass="FlexContainer"
        push={push}
        pushHandler={pushHandler}
      />
      <EditDetails push={push} pushHandler={pushHandler} />
      <EditMission push={push} pushHandler={pushHandler} />
    </div>
  );
};

export default CompanyProfileForm;
