import React from 'react';

import classes from './LoadingBar.module.css';

const LoadingBar = props => {
  return (
    <div className={classes.LoadingBar} style={props.style}>
      <div className={classes.Bounce1} style={{ width: props.width || '15px', height: props.width || '15px' }} />
      <div className={classes.Bounce2} style={{ width: props.width || '15px', height: props.width || '15px' }} />
      <div className={classes.Bounce3} style={{ width: props.width || '15px', height: props.width || '15px' }} />
    </div>
  );
};

export default LoadingBar;
