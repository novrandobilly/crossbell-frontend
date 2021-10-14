import React from 'react';

import CompanyAuthForm from '../../components/RegistrationModal/CompanyAuthForm';
import classes from './CompanyAuth.module.css';

const CompanyAuth = () => {
  return (
    <section className={classes.CompanyAuthContainer}>
      <div className={classes.CompanyAuthForm}>
        <CompanyAuthForm />
      </div>
    </section>
  );
};

export default CompanyAuth;
