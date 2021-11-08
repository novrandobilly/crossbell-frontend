import React, { useState, useEffect } from 'react';

import EditCompanyBiodata from '../../components/EditCompanyBiodata';
import EditCompanyDescriptions from '../../components/EditCompanyDescriptions';
import EditPIC from '../../components/EditPIC';

import classes from './CompanyProfileForm.module.css';

const CompanyProfileForm = props => {
  const [push, setPush] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pushHandler = () => {
    setPush(!push);
  };

  const onNextHandler = () => {
    setCounter(prevState => {
      return prevState + 1;
    });
  };

  const onBackHandler = () => {
    setCounter(prevState => {
      return prevState - 1;
    });
  };

  return (
    <div className={classes.Form}>
      {counter === 0 ? (
        <EditCompanyBiodata
          FlexClass='FlexContainer'
          push={push}
          pushHandler={pushHandler}
          onNextHandler={onNextHandler}
        />
      ) : counter === 1 ? (
        <EditCompanyDescriptions
          push={push}
          pushHandler={pushHandler}
          onNextHandler={onNextHandler}
          onBackHandler={onBackHandler}
        />
      ) : (
        <EditPIC push={push} pushHandler={pushHandler} onBackHandler={onBackHandler} />
      )}
    </div>
  );
};

export default CompanyProfileForm;
