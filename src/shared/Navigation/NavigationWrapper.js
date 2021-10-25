import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import MainDrawer from './MainDrawer';
import NavigationLinks from './NavigationLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UI_Element/Backdrop';
import Logo from '../UI_Element/Logo';
import Modal from '../UI_Element/Modal';
import Login from '../../general/components/RegistrationModal/Login';
import Register from '../../general/components/RegistrationModal/Register';
import styles from './NavigationWrapper.module.scss';

const NavigationWrapper = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      window.addEventListener('resize', () => {
        setViewportWidth(window.innerWidth);
      });
    }

    const cleanUp = () => {
      mounted = false;
    };
    return cleanUp();
  }, [viewportWidth]);

  return (
    <React.Fragment>
      <Modal
        show={showAuthForm}
        onCancel={onCancelAuth}
        headerText={isLogin ? 'Login ' : 'Registration Form'}
        style={{
          top: !isLogin && viewportWidth > '480' ? '10vh' : !isLogin && '2vh',
          maxWidth: viewportWidth > '480' ? '400px' : '360px',
          marginLeft: viewportWidth > '480' ? '-200px' : '-180px',
        }}>
        {isLogin ? (
          <Login
            onSwitchToRegister={onSwitchToRegister}
            onForgotPassword={onCancelAuth}
            onSucceedLogin={onCancelAuth}
          />
        ) : (
          <Register onSwitchToLogin={onSwitchToLogin} onSucceedRegister={onCancelAuth} />
        )}
      </Modal>

      {drawerIsOpen && <Backdrop onClick={toggleDrawerHandler} />}
      <MainDrawer>
        <Link to='/'>
          <Logo width='150px' />
        </Link>
        <nav className={styles.HeaderNav}>
          <NavigationLinks showLogin={showLogin} showRegistration={showRegistration} />
        </nav>
        <button className={styles.MenuBtn} onClick={toggleDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
      </MainDrawer>

      <SideDrawer show={drawerIsOpen}>
        <nav className={styles.DrawerNav} onClick={toggleDrawerHandler}>
          <NavigationLinks showLogin={showLogin} showRegistration={showRegistration} />
        </nav>
      </SideDrawer>
    </React.Fragment>
  );
};

export default NavigationWrapper;
