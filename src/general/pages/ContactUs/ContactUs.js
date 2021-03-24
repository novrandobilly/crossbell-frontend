import React from 'react';

import ContactUsHeader from '../../components/ContactUs/ContactUsHeader';
import ContactUsContent from '../../components/ContactUs/ContactUsContent';

import classes from './ContactUs.module.css';

const ContactUs = () => {
  return (
    <div className={classes.ContactUs}>
      <ContactUsHeader />
      <ContactUsContent />
    </div>
  );
};

export default ContactUs;
