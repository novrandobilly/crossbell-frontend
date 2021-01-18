import React, { useState } from 'react';

import Intro from '../Components/Edit/EditIntro.js';

import classes from './ApplicantResumeVal.module.css';

const ApplicantResumeVal = (props) => {
  const [push, setPush] = useState(true);

  const pushHandler = () => {
    setPush(!push);
  };

  return (
    <div className={classes.Container}>
      <div className={classes.ContentContainer}>
        <Intro push={push} handler={pushHandler} />
      </div>
    </div>
  );
};

export default ApplicantResumeVal;

/* <Education push={push} handler={pushHandler} />
        <Experience push={push} handler={pushHandler} />
        <Certification push={push} handler={pushHandler} /> */
