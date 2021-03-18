import React from 'react';

import Login from './Login';
import CompanyForm from '../Components/CompanyForm';
import Register from './Register';

const AuthForm = (props) => {
  if (props.role) {
    return (
      <React.Fragment>
        <div>
          {!props.sign ? (
            <CompanyForm sign={props.toggleSign} role={props.toggleRole} />
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
          {!props.sign ? (
            <Register sign={props.toggleSign} role={props.toggleRole} />
          ) : (
            <Login sign={props.toggleSign} />
          )}
        </div>
      </React.Fragment>
    );
  }
};

export default AuthForm;
