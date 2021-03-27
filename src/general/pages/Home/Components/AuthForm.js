import React from 'react';

import Login from './Login';
import CompanyForm from '../Components/CompanyForm';
import Register from './Register';
import NavForm from './NavForm';

const AuthForm = (props) => {
  if (props.role) {
    return (
      <React.Fragment>
        <div>
          {!props.sign && props.nav && props.touch ? (
            <CompanyForm sign={props.toggleSign} role={props.toggleRole} />
          ) : !props.sign && !props.nav && !props.touch ? (
            <NavForm
              toggleTouch={props.toggleTouch}
              toggleTouchCompany={props.toggleTouchCompany}
            />
          ) : (
            <Login sign={props.toggleSign} />
          )}
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div>
          {!props.sign && props.nav && props.touch ? (
            <Register sign={props.toggleSign} role={props.toggleRole} />
          ) : !props.sign && props.nav && !props.touch ? (
            <NavForm
              toggleTouch={props.toggleTouch}
              toggleTouchCompany={props.toggleTouchCompany}
            />
          ) : (
            <Login sign={props.toggleSign} />
          )}
        </div>
      </React.Fragment>
    );
  }
};

export default AuthForm;
