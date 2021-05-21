import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavigationLinks from './NavigationLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UI_Element/Backdrop';
import Logo from '../UI_Element/Logo';
// import NavLinks from './NavLinks';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawerHandler = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={toggleDrawerHandler} />}

      <SideDrawer show={drawerIsOpen}>
        <nav className={classes.DrawerNav} onClick={toggleDrawerHandler}>
          <NavigationLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button className={classes.MenuBtn} onClick={toggleDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h2 className={classes.Title}>
          <Link to='/'>
            <Logo logoWidth='45px' />
          </Link>
        </h2>
        <nav className={classes.HeaderNav}>
          <NavigationLinks />
          {/* <NavLinks /> */}
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
