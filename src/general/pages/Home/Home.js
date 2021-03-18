import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Carousel from './Components/Carousel';
import AuthForm from './Components/AuthForm';
import ContactUsContent from './HomeContent/ContactUsContent';
import classes from './Home.module.css';

const Home = (props) => {
  const [sign, setSign] = useState(false);
  const [role, setRole] = useState(false);
  const [touch, setTouch] = useState(false);

  const toggleSign = () => {
    setSign(!sign);
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
  const toggleTouchLogin = () => {
    setTouch(true);
    setSign(!sign);
  };

  return (
    <React.Fragment>
      <Carousel />
      <div className={classes.Content}>
        <div className={classes.ContentHolder}>
          <h1>CROSSBELL</h1>
          <div className={classes.About}>
            <p>Sudah saatnya berkarir dalam bidang impianmu!</p>
            <p>
              Temukan pekerjaan favoritmu dan mulailah mengejar mimpi sesuai
              kata hati!
            </p>
            <p>Jika bukan sekarang, kapan lagi?</p>
          </div>
          <div className={classes.LinkRef}>
            <Link to={`/jobs-dashboard`}>
              <p>CARI PEKERJAAN DISINI</p>
            </Link>
          </div>
        </div>
        <div className={classes.AuthForm}>
          {!props.auth.isLoggedIn && !props.admin.isLoggedIn && !touch && (
            <div className={classes.Container}>
              <div className={classes.SelectorContainer}>
                <div
                  className={classes.SelectorSection}
                  onClick={toggleTouch}
                  style={{ backgroundColor: 'white' }}
                >
                  Daftar sebagai pelamar
                </div>
                <div
                  className={classes.SelectorSection}
                  onClick={toggleTouchCompany}
                  style={{ backgroundColor: 'white' }}
                >
                  Daftar sebagai Perusahaan
                </div>
                <div
                  className={classes.SelectorSection}
                  onClick={toggleTouchLogin}
                  style={{ backgroundColor: '#d7e2ff' }}
                >
                  Masuk dengan akun yang ada
                </div>
              </div>
            </div>
          )}

          {!props.auth.isLoggedIn && !props.admin.isLoggedIn && touch && (
            <AuthForm
              role={role}
              sign={sign}
              toggleSign={toggleSign}
              toggleRole={toggleRole}
            />
          )}
        </div>
      </div>
      <div className={classes.SmallAbout}>
        <h1>CROSSBELL</h1>
        <div className={classes.About}>
          <p>Sudah saatnya berkarir dalam bidang impianmu!</p>
          <p>
            Temukan pekerjaan favoritmu dan mulailah mengejar mimpi sesuai kata
            hati!
          </p>
          <p>Jika bukan sekarang, kapan lagi?</p>
        </div>
      </div>

      <ContactUsContent />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    admin: state.admin,
  };
};

export default connect(mapStateToProps)(Home);
