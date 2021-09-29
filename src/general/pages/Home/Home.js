import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Carousel from './components/Carousel';
import AuthForm from './components/AuthForm';
import ContactUsContent from './HomeContent/ContactUsContent';
import classes from './Home.module.css';

const Home = props => {
  const [sign, setSign] = useState(true);
  const [role, setRole] = useState(false);
  const [touch, setTouch] = useState(false);
  const [nav, setNav] = useState(false);

  const toggleSign = () => {
    setSign(!sign);
    setNav(true);
  };

  const toggleRole = () => {
    setRole(!role);
  };

  const toggleTouch = () => {
    setTouch(true);
  };
  const toggleTouchCompany = () => {
    setTouch(true);
    setRole(!role);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <Carousel />
      <div className={classes.Content}>
        <div className={classes.ContentHolder}>
          <h1>CROSSBELL</h1>
          <div className={classes.About}>
            <p>Sudah saatnya berkarir dalam bidang impianmu!</p>
            <p>Temukan pekerjaan favoritmu dan mulailah mengejar mimpi sesuai kata hati!</p>
            <p>Jika bukan sekarang, kapan lagi?</p>
          </div>

          <div className={classes.LinkRef}>
            <Link to={`/jobs-dashboard`}>
              <div className={classes.Explore}>CARI PEKERJAAN DISINI</div>
            </Link>
          </div>

          <div className={classes.HeadhunterButton}>
            <Link to={`/co/order/es`}>
              <div className={classes.Order}>JASA HEADHUNTER BOSS SIAPA TAKUT</div>
            </Link>
          </div>
        </div>

        <div className={classes.AuthForm}>
          {!props.auth.isLoggedIn && !props.admin.isLoggedIn && (
            <AuthForm
              role={role}
              sign={sign}
              touch={touch}
              nav={nav}
              toggleSign={toggleSign}
              toggleRole={toggleRole}
              toggleTouch={toggleTouch}
              toggleTouchCompany={toggleTouchCompany}
            />
          )}
        </div>
      </div>
      <div className={classes.SmallAbout}>
        <h1>CROSSBELL</h1>
        <div className={classes.About}>
          <p>Sudah saatnya berkarir dalam bidang impianmu!</p>
          <p>Temukan pekerjaan favoritmu dan mulailah mengejar mimpi sesuai kata hati!</p>
          <p>Jika bukan sekarang, kapan lagi?</p>
        </div>
      </div>

      <ContactUsContent />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    admin: state.admin,
  };
};

export default connect(mapStateToProps)(Home);
