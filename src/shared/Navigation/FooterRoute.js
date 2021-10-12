import React from 'react';
import { Link } from 'react-router-dom';

import classes from './FooterRoute.module.css';

const FooterRoute = () => {
  return (
    <div className={classes.FooterRoute}>
      <Link to='/about-us'>
        <p>Tentang Kami</p>
      </Link>
      <Link to='/syarat-ketentuan'>
        <p>Syarat & Ketentuan</p>
      </Link>
      <Link to='/kebijakan-privasi'>
        <p>Kebijakan Privasi</p>
      </Link>
    </div>
  );
};

export default FooterRoute;
