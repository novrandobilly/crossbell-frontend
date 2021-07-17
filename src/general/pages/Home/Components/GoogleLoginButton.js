import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../../../../store/actions';

import classes from './GoogleLoginButton.module.css';

const GoogleLoginButton = (props) => {
  const responseSuccessGoogle = async (response) => {
    const payload = {
      idToken: response.tokenId,
    };
    try {
      const res = await props.googleLogin(payload);
      console.log(res);
      props.history.push('/jobs-dashboard');
    } catch (err) {
      console.log(err);
    }
  };
  const responseErrorGoogle = (response) => {};
  return (
    <div className={classes.GoogleLogin}>
      <GoogleLogin
        clientId='968047575665-o4ugi6bco8pp3j4ba10cs55av6cms52c.apps.googleusercontent.com'
        buttonText='Login with Google'
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    googleLogin: (payload) => dispatch(actionCreators.googleLogin(payload)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(GoogleLoginButton));
