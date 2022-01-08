import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import MainDrawer from './MainDrawer';
import NavigationLinks from './NavigationLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UI_Element/Backdrop';
import Logo from '../UI_Element/Logo';
import Modal from '../UI_Element/Modal';
import Login from '../../general/components/RegistrationModal/Login';
import Register from '../../general/components/RegistrationModal/Register';
import styles from './NavigationWrapper.module.scss';

const NavigationWrapper = ({ admin, auth, getAdminNotifications, getCompanyNotifications }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [notificationsLength, setNotificationsLength] = useState(0);

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

  const { token, userId, isAdmin } = admin;
  useEffect(() => {
    if (isAdmin) {
      const payload = {
        adminId: userId,
        token: token,
      };
      getAdminNotifications(payload)
        .then((res) => {
          const unread = res.notifications?.filter((notif) => !notif.isOpened.some((id) => id === userId)).length;
          setNotificationsLength(unread);
        })
        .catch((err) => console.log(err));
    }
    if (auth.isCompany) {
      const payload = {
        companyId: auth.userId,
        token: auth.token,
      };
      getCompanyNotifications(payload)
        .then((res) => {
          const unread = res.notifications?.filter((notif) => !notif.isOpened.some((id) => id === auth.userId)).length;
          setNotificationsLength(unread);
        })
        .catch((err) => console.log(err));
    }
  }, [token, userId, isAdmin, getAdminNotifications, getCompanyNotifications, auth.userId, auth.token, auth.isCompany]);
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAdminNotifications: (payload) => dispatch(actionCreators.getAdminNotifications(payload)),
    getCompanyNotifications: (payload) => dispatch(actionCreators.getCompanyNotifications(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationWrapper);
