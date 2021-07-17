import React from 'react';
import { useForm } from '../../../shared/utils/useForm';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';
import Input from '../../../shared/UI_Element/Input';
import Button from '@material-ui/core/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_NUMSTR,
} from '../../../shared/utils/validator';

import classes from './ContactUsForm.module.css';

const ContactUsForm = (props) => {
  const [formState, onInputHandler] = useForm(
    {
      nama: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      phone: {
        value: '',
        isValid: false,
      },
      feed: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const newFeed = {
      name: formState.inputs.nama.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      feed: formState.inputs.feed.value,
    };
    try {
      const res = await props.createFeed(newFeed);
      if (res) {
        alert('Success Posting your feed!');
      } else {
        throw new Error(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.ContactUsContainer}>
      <form onSubmit={onSubmitHandler} className={classes.ContactUsForm}>
        <Input
          inputType='input'
          label='Nama Lengkap'
          id='nama'
          name='nama'
          onInputHandler={onInputHandler}
          validatorMethod={[VALIDATOR_REQUIRE()]}
        />
        <Input
          inputType='input'
          label='Email'
          id='email'
          name='email'
          onInputHandler={onInputHandler}
          validatorMethod={[VALIDATOR_EMAIL()]}
        />
        <Input
          inputType='input'
          label='No Telephone'
          id='phone'
          name='phone'
          onInputHandler={onInputHandler}
          validatorMethod={[VALIDATOR_NUMSTR()]}
        />
        <Input
          inputType='textarea'
          label='Pesan...'
          rows={10}
          id='feed'
          name='feed'
          onInputHandler={onInputHandler}
          validatorMethod={[VALIDATOR_MINLENGTH(10)]}
        />

        <div className={classes.Footer}>
          <Button
            disabled={!formState.formIsValid}
            btnType={'Dark'}
            onClick={onSubmitHandler}
            variant='contained'
            color='primary'
            type='submit'
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createFeed: (newFeed) => dispatch(actionCreators.createFeed(newFeed)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(ContactUsForm));
