import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainDrawer from './MainDrawer';
import NavigationLinks from './NavigationLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UI_Element/Backdrop';
import Logo from '../UI_Element/Logo';
import classes from './NavigationWrapper.module.css';

const NavigationWrapper = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawerHandler = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={toggleDrawerHandler} />}
      <MainDrawer>
        <Link to='/'>
          <Logo width='200px' />
        </Link>
        <nav className={classes.HeaderNav}>
          <NavigationLinks />
        </nav>
        <button className={classes.MenuBtn} onClick={toggleDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
      </MainDrawer>

      <SideDrawer show={drawerIsOpen}>
        <nav className={classes.DrawerNav} onClick={toggleDrawerHandler}>
          <NavigationLinks />
        </nav>
      </SideDrawer>
    </React.Fragment>
  );
};

export default NavigationWrapper;
