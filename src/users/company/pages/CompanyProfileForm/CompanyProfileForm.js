import React, { useState, useEffect } from 'react';

import EditIntro from '../Components/EditIntro';
import EditCompanyBriefDescriptions from '../Components/EditCompanyBriefDescriptions';
import EditPIC from '../Components/EditPIC';

import classes from './CompanyProfileForm.module.css';

const CompanyProfileForm = (props) => {
  const [push, setPush] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pushHandler = () => {
    setPush(!push);
  };

  const onNextHandler = () => {
    setCounter((prevState) => {
      return prevState + 1;
    });
  };

  const onBackHandler = () => {
    setCounter((prevState) => {
      return prevState - 1;
    });
  };

  return (
    <div className={classes.Form}>
      {counter === 0 ? (
        <EditIntro
          FlexClass='FlexContainer'
          push={push}
          pushHandler={pushHandler}
          onNextHandler={onNextHandler}
        />
      ) : counter === 1 ? (
        <EditCompanyBriefDescriptions
          push={push}
          pushHandler={pushHandler}
          onNextHandler={onNextHandler}
          onBackHandler={onBackHandler}
        />
      ) : (
        <EditPIC
          push={push}
          pushHandler={pushHandler}
          onBackHandler={onBackHandler}
        />
      )}
    </div>
  );
};

export default CompanyProfileForm;
