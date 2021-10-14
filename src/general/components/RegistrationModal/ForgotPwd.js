import React from 'react';
import { VALIDATOR_EMAIL } from '../../../shared/utils/validator';
import { useForm } from '../../../shared/utils/useForm';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';

import classes from './ForgotPwd.module.css';
import Input from '../../../shared/UI_Element/Input';
// import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
// import Modal from '../../../shared/UI_Element/Modal';

const ForgotPwd = props => {
  const [formState, onInputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const onSubmitResetHandler = async event => {
    event.preventDefault();
    const payload = {
      email: formState.inputs.email.value,
    };
    try {
      const res = await props.forgotPwd(payload);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmitResetHandler} className={classes.Container}>
      <div className={classes.ContainerFlex}>
        <p className={classes.FormTitle}>Forgot Password Page</p>
        <p className={classes.SubTitle}>
          <em>Confirm your email address to get the instruction for restarting your password</em>
        </p>
        <Input
          inputType='input'
          id='email'
          InputClass='Forgot_Password'
          validatorMethod={[VALIDATOR_EMAIL()]}
          onInputHandler={onInputHandler}
          label='Email*'
        />

        <button disabled={!formState.formIsValid} className={classes.SubmitButton}>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    forgotPwd: payload => dispatch(actionCreators.forgotPwd(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPwd);
