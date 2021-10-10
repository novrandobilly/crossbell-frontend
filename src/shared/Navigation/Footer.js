import React from 'react';

import Address from './Address';
import Logo from '../UI_Element/Logo';
import LogoSrc from '../../assets/Crossbell_Logo2.svg';
import FooterRoute from './FooterRoute';

import classes from './Footer.module.css';

const Footer = () => {
  return (
    <div className={classes.Footer}>
      <div className={classes.LogoAddress}>
        <div className={classes.Logo}>
          <Logo src={LogoSrc} width='150px' />
        </div>
        <FooterRoute />
        <Address />
      </div>
      <div className={classes.Copyright}>© 2021 Crossbell. All Rights Reserved.</div>
    </div>
  );
};

export default Footer;
