import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Button from '../../../shared/UI_Element/Button';
import ContactUsForm from '../../components/ContactUs/ContactUsForm';

import CustomerService from '../../../assets/images/Customer_Service.png';
import Meeting from '../../../assets/images/Meeting.png';
import classes from './ContactUsContent.module.css';
import FAQ from './FAQ';

const ContactUsContent = () => {
  const [isForm, setIsForm] = useState(false);

  const switchFormHandler = () => {
    setIsForm((isForm) => !isForm);
  };

  let content = (
    <React.Fragment>
      <div className={classes.HelpArticles}>
        <h3>Help Articles</h3>
        <div>
          <FAQ className={classes.HelpArticlesLink} />
        </div>{' '}
        <span className={classes.SeeAllArticles}>
          <Link to='/FrequentlyAskedQuestion'>See all help articles</Link>
        </span>
      </div>
      <div className={classes.NeedSupport}>
        <h3>Need Support?</h3>
        <img
          src={CustomerService}
          alt='customer-service'
          style={{ width: '15rem' }}
        />
        <div>
          <Button btnType='Dark' onClick={switchFormHandler}>
            Contact Us Now
          </Button>
        </div>
      </div>
    </React.Fragment>
  );

  if (isForm) {
    content = <ContactUsForm />;
  }

  return (
    <div className={classes.ContactUsContent}>
      <div className={classes.Section1}>{content}</div>
      <div className={classes.Section2}>
        <img src={Meeting} alt='meeting' style={{ width: '25rem' }} />
        <div>
          <h3>Are You Looking for candidates for Executive Position?</h3>
          <p>
            In Crossbell, our team can help you find candidates which suitable
            with the critical position and requirements based on your needs.
          </p>
          <Button btnType='Dark'>Request Enquiry</Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ContactUsContent);
