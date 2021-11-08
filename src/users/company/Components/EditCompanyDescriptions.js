import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../shared/utils/useForm';

import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions/index';
import { VALIDATOR_MINLENGTH } from '../../../shared/utils/validator';

import Modal from '../../../shared/UI_Element/Modal';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../shared/UI_Element/Input';
import styles from './EditCompanyDescriptions.module.scss';

const EditCompanyDescriptions = props => {
  const { companyid } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOneCompany } = props;
  useEffect(() => {
    getOneCompany({ userId: companyid }).then(res => {
      setData(res.company);
    });
  }, [getOneCompany, companyid]);

  const [formState, onInputHandler] = useForm(
    {
      briefDescriptions: {
        value: data ? data.briefDescriptions : null,
        isValid: data && data.briefDescriptions ? true : false,
      },
    },
    false
  );

  const onSubmitHandler = async event => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateCompanyFail();
    }

    const updatedData = {
      companyId: companyid,
      briefDescriptions: formState.inputs.briefDescriptions.value,
      token: props.auth.token || props.admin.token,
    };

    try {
      await props.updateCompanyBriefDescriptions(updatedData);
      props.fetchCompany();
      props.onCancel();
    } catch (err) {
      console.log(err);
    }
  };

  let formContent = <LoadingBar />;

  if (!props.isLoading && data) {
    formContent = (
      <form onSubmit={onSubmitHandler} className={styles.EditCompanyDescriptionsContainer}>
        <Input
          inputType='textarea'
          id='briefDescriptions'
          InputClass='EditProfileTextArea'
          validatorMethod={[VALIDATOR_MINLENGTH(20)]}
          onInputHandler={onInputHandler}
          label={false}
          initValue={data.briefDescriptions}
          initIsValid={data.briefDescriptions}
          rows={11}
          style={{ borderRadius: '10px', borderColor: '#f79f35', padding: '5px', outline: 'none' }}
        />

        <div className={styles.SubmitButtonContainer}>
          <button type='button' onClick={props.onCancel}>
            Back
          </button>
          <button disabled={!formState.formIsValid} type='submit'>
            Save
          </button>
        </div>
      </form>
    );
  }

  const onCancelHandler = () => {
    props.resetCompany();
  };

  return (
    <Fragment>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Could not update changes at the moment, please try again later
      </Modal>
      {formContent}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.company.isLoading,
    error: state.company.error,
    auth: state.auth,
    admin: state.admin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCompanyFail: () => dispatch({ type: actionTypes.UPDATECOMPANYFAIL }),
    resetCompany: () => dispatch({ type: actionTypes.COMPANYRESET }),
    getOneCompany: data => dispatch(actionCreators.getOneCompany(data)),
    updateCompanyBriefDescriptions: CompanyData => dispatch(actionCreators.updateCompanyBriefDescriptions(CompanyData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditCompanyDescriptions));
