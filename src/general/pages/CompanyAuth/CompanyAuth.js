import React from 'react';

import CompanyRegisForm from '../../components/RegistrationModal/CompanyRegisForm';
import classes from './CompanyAuth.module.css';

const CompanyAuth = () => {
  return (
    <section className={classes.CompanyAuthContainer}>
      <div className={classes.CompanyRegisForm}>
        <CompanyRegisForm />
      </div>
    </section>
  );
};

export default CompanyAuth;
