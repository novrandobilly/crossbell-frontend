import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import { LoginContext } from '../../store/LoginContext';

import MainDrawer from './MainDrawer';
import NavigationLinks from './NavigationLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UI_Element/Backdrop';
import Logo from '../UI_Element/Logo';
import Modal from '../UI_Element/Modal';
import Login from '../../general/components/RegistrationModal/Login';
import Register from '../../general/components/RegistrationModal/Register';
import styles from './NavigationWrapper.module.scss';

const NavigationWrapper = ({ admin, auth, getAdminNotifications, getCompanyNotifications, notif }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [notificationsLength, setNotificationsLength] = useState(0);

  const loginCtx = useContext(LoginContext);

  const toggleDrawerHandler = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  const onSwitchToRegister = () => setIsLogin(false);
  const onSwitchToLogin = () => setIsLogin(true);
  const showLogin = () => {
    loginCtx.showLogin();
    setIsLogin(true);
  };
  const showRegistration = () => {
    loginCtx.showLogin();
    setIsLogin(false);
  };
  const onCancelAuth = () => loginCtx.closeLogin();

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

  const { userId, isAdmin } = admin;
  useEffect(() => {
    const { notifications } = notif;
    let unread = [];
    if (isAdmin) unread = notifications.filter((notif) => !notif.isOpened.some((id) => id === userId)).length;
    if (auth.isCompany)
      unread = notifications.filter((notif) => !notif.isOpened.some((id) => id === auth.userId)).length;
    setNotificationsLength(unread);
  }, [notif, userId, isAdmin, auth.userId, auth.isCompany]);
  return (
    <React.Fragment>
      <Modal
        show={loginCtx.login}
        onCancel={loginCtx.closeLogin}
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
          <Register onSwitchToLogin={onSwitchToLogin} onSucceedRegister={onCancelAuth} onCancelAuth={onCancelAuth} />
        )}
      </Modal>

      {drawerIsOpen && <Backdrop onClick={toggleDrawerHandler} />}
      <MainDrawer>
        <Link to='/'>
          <Logo width='150px' />
        </Link>
        <nav className={styles.HeaderNav}>
          <NavigationLinks
            showLogin={showLogin}
            notificationsLength={notificationsLength}
            showRegistration={showRegistration}
          />
        </nav>
        <button className={styles.MenuBtn} onClick={toggleDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
      </MainDrawer>

      <SideDrawer show={drawerIsOpen}>
        <nav className={styles.DrawerNav} onClick={toggleDrawerHandler}>
          <NavigationLinks
            notificationsLength={notificationsLength}
            showLogin={showLogin}
            showRegistration={showRegistration}
          />
        </nav>
      </SideDrawer>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    auth: state.auth,
    notif: state.notification,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAdminNotifications: (payload) => dispatch(actionCreators.getAdminNotifications(payload)),
    getCompanyNotifications: (payload) => dispatch(actionCreators.getCompanyNotifications(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationWrapper);
