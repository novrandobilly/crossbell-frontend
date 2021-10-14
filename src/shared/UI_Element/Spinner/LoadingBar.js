import React from 'react';

import classes from './LoadingBar.module.css';

const LoadingBar = () => {
  return (
    <div className={classes.LoadingBar}>
      <div className={classes.Bounce1} />
      <div className={classes.Bounce2} />
      <div className={classes.Bounce3} />
    </div>
  );
};

export default LoadingBar;
