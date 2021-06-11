import React from 'react';

import CrossbellLogo from '../../assets/images/Crossbell_Emblem.png';
import classes from './Logo.module.css';

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img
        src={CrossbellLogo}
        alt='Crossbell logo'
        style={{ width: props.logoWidth || '75px', marginRight: '16px' }}
      />
      Crossbell
    </div>
  );
};

export default Logo;
