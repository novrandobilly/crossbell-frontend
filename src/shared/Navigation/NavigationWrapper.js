import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainDrawer from './MainDrawer';
import NavigationLinks from './NavigationLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UI_Element/Backdrop';
import Logo from '../UI_Element/Logo';
import Modal from '../UI_Element/Modal';
import Login from '../../general/components/RegistrationModal/Login';
import Register from '../../general/components/RegistrationModal/Register';
import classes from './NavigationWrapper.module.css';

const NavigationWrapper = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showAuthForm, setShowAuthForm] = useState(false);

  const toggleDrawerHandler = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  const onSwitchToRegister = () => setIsLogin(false);
  const onSwitchToLogin = () => setIsLogin(true);
  const showLogin = () => {
    setShowAuthForm(true);
    setIsLogin(true);
  };
  const showRegistration = () => {
    setShowAuthForm(true);
    setIsLogin(false);
  };
  const onCancelAuth = () => setShowAuthForm(false);

  return (
    <React.Fragment>
      <Modal
        show={showAuthForm}
        onCancel={onCancelAuth}
        headerText={isLogin ? 'Login ' : 'Registration Form'}
        style={{ top: !isLogin && '10vh', '--containerWidth': '400px' }}>
        {isLogin ? (
          <Login onSwitchToRegister={onSwitchToRegister} onForgotPassword={onCancelAuth} />
        ) : (
          <Register onSwitchToLogin={onSwitchToLogin} />
        )}
      </Modal>

      {drawerIsOpen && <Backdrop onClick={toggleDrawerHandler} />}
      <MainDrawer>
        <Link to='/'>
          <Logo width='200px' />
        </Link>
        <nav className={classes.HeaderNav}>
          <NavigationLinks showLogin={showLogin} showRegistration={showRegistration} />
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
