import React from 'react';
import CrossbellLogo from '../../assets/Crossbell_Logo.svg';

const Logo = props => {
  return (
    <img
      src={props.src || CrossbellLogo}
      alt='Crossbell logo'
      style={{ width: `${props.width || '36px'}`, height: 'auto', margin: '0', padding: '0' }}
    />
  );
};

export default Logo;
