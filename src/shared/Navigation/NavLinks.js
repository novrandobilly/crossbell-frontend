import React from 'react';

import classes from './NavLinks.module.css';

const NavLinks = () => {
  return (
    <React.Fragment>
      <a href='/' className={classes.LinkRef}>
        Home
      </a>
      <a href='/job-dashboard' className={classes.LinkRef}>
        About
      </a>
      <a href='/#' className={classes.LinkRef}>
        Blog
      </a>
      <a href='/#' className={classes.LinkRef}>
        Porto
      </a>
      <a href='/#' className={classes.LinkRef}>
        Content
      </a>
      <div className={[classes.Animation, classes.StartHome].join(' ')} />
    </React.Fragment>
  );
};

export default NavLinks;
