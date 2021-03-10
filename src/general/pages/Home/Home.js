import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Carousel from './Components/Carousel';
import AuthForm from './Components/AuthForm';
import ContentTextRight from './HomeContent/ContentTextRight';
import ContentTextLeft from './HomeContent/ContentTextLeft';
import ContactUsContent from './HomeContent/ContactUsContent';
import FeatureContent from './HomeContent/FeatureContent';
import TeamContent from './HomeContent/TeamContent';
import classes from './Home.module.css';

const Home = (props) => {
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
          {!props.auth.isLoggedIn && !props.admin.isLoggedIn && <AuthForm />}
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

      <FeatureContent />
      <ContentTextRight />
      <ContentTextLeft />
      <TeamContent />
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
