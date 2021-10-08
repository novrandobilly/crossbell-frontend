import React from 'react';
import classes from './MainDrawer.module.css';

const MainDrawer = props => {
  return <header className={classes.MainDrawer}>{props.children}</header>;
};

export default MainDrawer;
