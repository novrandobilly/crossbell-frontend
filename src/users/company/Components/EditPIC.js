import React, { useEffect, useState, Fragment } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../../shared/utils/useForm';

import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions/index';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../../../shared/utils/validator';

import Modal from '../../../shared/UI_Element/Modal';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../shared/UI_Element/Input';

import styles from './EditPIC.module.scss';

const EditPIC = props => {
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
      picName: {
        value: data ? data.picName : null,
        isValid: data && data.picName ? true : false,
      },
      picJobTitle: {
        value: data ? data.picJobTitle : null,
        isValid: data && data.picJobTitle ? true : false,
      },
      picEmail: {
        value: data ? data.picEmail : null,
        isValid: data && data.picEmail ? true : false,
      },
      picPhone: {
        value: data ? data.picPhone : null,
        isValid: data && data.picPhone ? true : false,
      },
      picOfficePhone: {
        value: data ? data.picOfficePhone : null,
        isValid: data && data.picOfficePhone ? true : false,
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
      picName: formState.inputs.picName.value,
      picJobTitle: formState.inputs.picJobTitle.value,
      picEmail: formState.inputs.picEmail.value,
      picPhone: formState.inputs.picPhone.value,
      picOfficePhone: formState.inputs.picOfficePhone.value,
      token: props.auth.token || props.admin.token,
    };
    try {
      await props.updateCompanyPIC(updatedData);
      props.fetchCompany();
      props.onCancel();
    } catch (err) {
      console.log(err);
    }
  };

  let formContent = <LoadingBar />;

  if (!props.isLoading && data) {
    formContent = (
      <form onSubmit={onSubmitHandler} className={styles.EditPICContainer}>
        <Input
          inputType='input'
          id='picName'
          InputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Nama Lengkap*'
          initValue={data.picName}
          initIsValid={data.picName}
        />

        <Input
          inputType='input'
          id='picJobTitle'
          InputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Jabatan*'
          initValue={data.picJobTitle}
          initIsValid={data.picJobTitle}
        />

        <Input
          inputType='input'
          id='picEmail'
          InputClass='AddJobInput'
          validatorMethod={[VALIDATOR_EMAIL()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Email*'
          initValue={data.picEmail}
          initIsValid={data.picEmail}
        />

        <Input
          inputType='input'
          id='picPhone'
          InputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Nomor telepon / Whatsapp*'
          initValue={data.picPhone}
          initIsValid={data.picPhone}
        />

        <Input
          inputType='input'
          id='picOfficePhone'
          InputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Nomor Telepon Kantor*'
          initValue={data.picPhone}
          initIsValid={data.picPhone}
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
    updateCompanyPIC: CompanyData => dispatch(actionCreators.updateCompanyPIC(CompanyData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPIC));
