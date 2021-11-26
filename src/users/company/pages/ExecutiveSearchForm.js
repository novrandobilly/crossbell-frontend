import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../../shared/utils/useForm';

import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions/index';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../shared/utils/validator';

import Autocomplete from '@mui/material/Autocomplete';
import { CustomTextField } from '../../../shared/UI_Element/CustomMUIComponents';
import Input from '../../../shared/UI_Element/Input';
import Modal from '../../../shared/UI_Element/Modal';
import IndustryData from '../../../shared/UI_Element/IndustryData';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import HeaderBanner from '../../../shared/UI_Element/HeaderBanner';
import MeetingCompany from '../../../assets/images/CompanyMeeting.png';

import styles from './ExecutiveSearchForm.module.scss';

const ExecutiveSearchForm = props => {
  const [industry, setIndustry] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [inputIndustry, setInputIndustry] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formState, onInputHandler] = useForm(
    {
      name: {
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

      companyName: {
        value: '',
        isValid: false,
      },

      industry: {
        value: null,
        isValid: false,
      },

      candidateRequirement: {
        value: '',
        isValid: true,
      },

      specialRequirement: {
        value: '',
        isValid: true,
      },
    },
    false
  );

  useEffect(() => {
    onInputHandler('industry', industry?.industry, industry?.industry ? true : false);
  }, [onInputHandler, industry]);

  const onSubmitHandler = async event => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.createOrderFail();
    }

    const orderES = {
      name: formState.inputs.name.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      companyName: formState.inputs.companyName.value,
      industry: formState.inputs.industry.value,
      candidateRequirement: formState.inputs.candidateRequirement.value,
      specialRequirement: formState.inputs.specialRequirement.value,
      token: props.auth.token || props.admin.token,
    };
    try {
      const res = await props.createRequest(orderES);
      console.log(res);
      setSuccessModal(true);
    } catch (err) {
      console.log(err);
      return props.createOrderFail();
    }
  };

  const onAutoCompleteHandler = (event, newValue) => {
    event.preventDefault();
    if (typeof newValue === 'string') {
      setIndustry({
        industry: newValue,
      });
      onInputHandler('industry', newValue.industry, true);
    } else if (newValue && newValue.inputValue) {
      setIndustry({
        industry: newValue.inputValue,
      });
      onInputHandler('industry', newValue.inputValue.industry, true);
    } else {
      setIndustry(newValue);
      onInputHandler('industry', newValue?.industry || '', true);
    }
  };

  const onInputChangeHandler = (event, newValue) => {
    setInputIndustry(newValue);
    onInputHandler('industry', newValue, true);
  };

  let formContent = (
    <form onSubmit={onSubmitHandler} className={styles.ESFormContainer}>
      <Input
        inputType='input'
        id='name'
        inputClass='AddJobInput'
        validatorMethod={[VALIDATOR_REQUIRE()]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Nama*'
      />

      <Input
        inputType='input'
        id='email'
        name='email'
        inputClass='AddJobInput'
        validatorMethod={[VALIDATOR_EMAIL()]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Email*'
      />

      <Input
        inputType='input'
        id='phone'
        inputClass='AddJobInput'
        validatorMethod={[VALIDATOR_REQUIRE()]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Nomor Telepon*'
      />

      <Input
        inputType='input'
        id='companyName'
        inputClass='AddJobInput'
        validatorMethod={[VALIDATOR_REQUIRE()]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Nama Perusahaan*'
      />

      <div className={styles.CompanyIndustry}>
        <p>Bidang industri perusahaan</p>
        <Autocomplete
          id='industry'
          name='industry'
          freeSolo
          options={IndustryData.sort((a, b) => {
            const optA = a.industry.toLowerCase();
            const optB = b.industry.toLowerCase();
            if (optA < optB) return -1;
            if (optA > optB) return 1;
            return 0;
          })}
          getOptionLabel={option => `${option.industry}`}
          value={industry || null}
          onChange={onAutoCompleteHandler}
          inputValue={inputIndustry}
          onInputChange={onInputChangeHandler}
          renderInput={params => <CustomTextField {...params} />}
        />
      </div>

      <Input
        inputType='textarea'
        id='candidateRequirement'
        validatorMethod={[VALIDATOR_MINLENGTH(0)]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Persyaratan Minimum Kandidat'
        rows={7}
        initIsValid={true}
        style={{ border: '2px solid #f79f35', borderRadius: '5px', outline: 'none' }}
      />

      <Input
        inputType='textarea'
        id='specialRequirement'
        validatorMethod={[VALIDATOR_MINLENGTH(0)]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Persyaratan Khusus Lainnya (optional)'
        rows={7}
        initIsValid={true}
        style={{ border: '2px solid #f79f35', borderRadius: '5px', outline: 'none' }}
      />
      {props.isLoading ? (
        <div className={styles.LoadingContainer}>
          <LoadingBar />
        </div>
      ) : (
        <button disabled={!formState.formIsValid} className={styles.SubmitButton}>
          Submit
        </button>
      )}
    </form>
  );

  const onCancelHandler = () => {
    props.resetCompany();
  };

  const onCloseModal = () => {
    setSuccessModal(false);
    props.history.push('/');
  };

  return (
    <Fragment>
      <HeaderBanner imageSource={MeetingCompany} />
      <Modal show={props.error} onCancel={onCancelHandler}>
        Silahkan coba lagi.
      </Modal>
      <Modal show={successModal} onCancel={onCloseModal}>
        <h3>Data berhasil terkirim.</h3>
        <h4>Tim Crossbell akan segera menghubungi anda.</h4>
      </Modal>
      <h2 className={styles.Title}>
        Form Pencarian <span className={styles.OrangeTitle}> Kandidat Eksekutif</span>
      </h2>
      {formContent}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.finance.isLoading,
    error: state.company.error,
    auth: state.auth,
    admin: state.admin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createRequest: payload => dispatch(actionCreators.createOrderES(payload)),
    createOrderFail: () => dispatch({ type: actionTypes.CREATEORDERCANDIDATEFAIL }),
    resetOrder: () => dispatch({ type: actionTypes.ORDERRESET }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ExecutiveSearchForm));
