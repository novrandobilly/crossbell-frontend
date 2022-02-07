import React from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../shared/UI_Element/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../../../shared/utils/validator';

import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions/index';
import { useForm } from '../../../shared/utils/useForm';

import styles from './PICDetails.module.scss';

const PICDetails = ({ isLoading, auth, admin, updateCompanyPIC, updateCompanyFail, history }) => {
  const { companyid } = useParams();
  let formContent = <LoadingBar />;

  const [formState, onInputHandler] = useForm(
    {
      picName: {
        value: null,
        isValid: false,
      },
      picJobTitle: {
        value: null,
        isValid: false,
      },
      picEmail: {
        value: null,
        isValid: false,
      },
      picPhone: {
        value: null,
        isValid: false,
      },
      picOfficePhone: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return updateCompanyFail();
    }

    const updatedData = {
      companyId: companyid,
      picName: formState.inputs.picName.value,
      picJobTitle: formState.inputs.picJobTitle.value,
      picEmail: formState.inputs.picEmail.value,
      picPhone: formState.inputs.picPhone.value,
      picOfficePhone: formState.inputs.picOfficePhone.value,
      token: auth.token || admin.token,
    };
    try {
      await updateCompanyPIC(updatedData);
      history.push(`/co/${companyid}/profile`);
    } catch (err) {
      console.log(err);
    }
  };

  if (!isLoading) {
    formContent = (
      <form onSubmit={onSubmitHandler} className={styles['PIC-form']}>
        <Input
          inputType='input'
          id='picName'
          InputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Nama Lengkap*'
        />

        <Input
          inputType='input'
          id='picJobTitle'
          InputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Jabatan*'
        />

        <Input
          inputType='input'
          id='picEmail'
          InputClass='AddJobInput'
          validatorMethod={[VALIDATOR_EMAIL()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Email*'
        />

        <Input
          inputType='input'
          id='picPhone'
          InputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Telepon/Whatsapp*'
        />

        <Input
          inputType='input'
          id='picOfficePhone'
          InputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Telepon Kantor*'
        />

        <div className={styles['submit-button-container']}>
          <button type='button' onClick={() => history.goBack()}>
            Back
          </button>

          <button disabled={!formState.formIsValid} type='submit'>
            Save
          </button>
        </div>
      </form>
    );
  }
  return (
    <div className={styles['PIC-container']}>
      <h1>Person In Charge (PIC)</h1>
      <p className={styles['explanation']}>
        Data PIC ini hanya diperlihatkan kepada admin dan hanya akan digunakan untuk menghubungi anda apabila terdapat
        kendala atau informasi yang perlu kami sampaikan kepada pihak perusahaan
      </p>
      {formContent}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.company.isLoading,
    error: state.company.error,
    auth: state.auth,
    admin: state.admin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCompanyFail: () => dispatch({ type: actionTypes.UPDATECOMPANYFAIL }),
    resetCompany: () => dispatch({ type: actionTypes.COMPANYRESET }),
    getOneCompany: (data) => dispatch(actionCreators.getOneCompany(data)),
    updateCompanyPIC: (CompanyData) => dispatch(actionCreators.updateCompanyPIC(CompanyData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PICDetails));
