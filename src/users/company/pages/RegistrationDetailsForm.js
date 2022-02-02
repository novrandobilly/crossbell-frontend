import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { useForm } from '../../../shared/utils/useForm';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_ALWAYSTRUE,
  VALIDATOR_MINLENGTH,
} from '../../../shared/utils/validator';
import Input from '../../../shared/UI_Element/Input';
import Autocomplete from '@mui/material/Autocomplete';
import IndustryData from '../../../shared/UI_Element/IndustryData';
import { CustomTextField } from '../../../shared/UI_Element/CustomMUIComponents';
import BlankProfile from '../../../assets/images/Blank_Profile.png';

import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions/index';

import styles from './RegistrationDetailsForm.module.scss';

const RegistrationDetailsForm = ({
  getOneCompany,
  updateCompanyBriefDescriptions,
  updateCompanyIntro,
  updateCompanyLogo,
  isLoading,
  admin,
  auth,
  history,
}) => {
  const [data, setData] = useState(null);
  const { companyid } = useParams();
  const [industry, setIndustry] = useState('');
  const [inputIndustry, setInputIndustry] = useState('');
  const [preview, setPreview] = useState(null);

  const [formState, onInputHandler] = useForm(
    {
      logo: {
        value: null,
        isValid: false,
      },
      companyName: {
        value: data ? data.companyName : null,
        isValid: data && data.companyName ? true : false,
      },
      email: {
        value: data ? data.email : null,
        isValid: data && data.email ? true : false,
      },
      industry: {
        value: null,
        isValid: false,
      },
      NPWP: {
        value: null,
        isValid: false,
      },
      address: {
        value: null,
        isValid: false,
      },
      website: {
        value: null,
        isValid: true,
      },
      briefDescriptions: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getOneCompany({ userId: companyid }).then((res) => {
      setData(res.company);
    });
  }, [companyid, getOneCompany]);

  const onAutoCompleteHandler = (event, newValue) => {
    setIndustry(newValue);
    onInputHandler('industry', newValue?.industry, !!newValue?.industry);
  };

  const onInputChangeHandler = (event, newValue) => {
    setInputIndustry(newValue);
    onInputHandler('industry', newValue, !!newValue);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { inputs } = formState;
    const introPayload = {
      companyId: companyid,
      companyName: inputs.companyName.value,
      email: inputs.email.value,
      industry: inputs.industry.value,
      NPWP: inputs.NPWP.value,
      address: inputs.address.value,
      website: inputs.website.value,
      briefDescriptions: inputs.briefDescriptions.value,
      token: auth.token || admin.token,
    };

    const briefDescriptionsPayload = {
      companyId: companyid,
      briefDescriptions: formState.inputs.briefDescriptions.value,
      token: auth.token || admin.token,
    };
    const logoPayload = {
      companyId: companyid,
      token: auth.token || admin.token,
      logo: formState.inputs.logo.value,
    };

    try {
      await updateCompanyIntro(introPayload);
      await updateCompanyLogo(logoPayload);
      await updateCompanyBriefDescriptions(briefDescriptionsPayload);
      history.push(`/co/${companyid}/pic-details`);
    } catch (err) {
      console.log(err);
    }
  };

  const onUploadHandler = async (e) => {
    const elementFile = e.target.files[0];
    const objectURL = URL.createObjectURL(elementFile);

    if (elementFile.size <= 500000) {
      onInputHandler('logo', elementFile, !!elementFile);
      setPreview(objectURL);
    }
  };

  let formContent = <LoadingBar />;

  if (!isLoading && data) {
    formContent = (
      <form onSubmit={onSubmitHandler} className={styles.BiodataForm}>
        <div className={styles.CompanyLogoContainer}>
          <img className={styles.CompanyLogo} alt='Company Logo' src={preview || BlankProfile} />
          <p className={styles.AdditionalNote}>Ukuran file maximum 500kb</p>
          <label htmlFor='CompanyLogo'>
            <p className={styles.UploadButton}>Upload Logo</p>
            <input
              accept='.jpg, .jpeg, .png'
              name='CompanyLogo'
              id='CompanyLogo'
              type='file'
              style={{ display: 'none' }}
              onChange={onUploadHandler}
            />
          </label>
        </div>
        <Input
          inputType='input'
          id='companyName'
          inputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Nama Perusahaan*'
          initValue={data.companyName || ''}
          initIsValid={data.companyName}
        />

        <Input
          inputType='input'
          id='email'
          name='email'
          inputClass='AddJobInput'
          validatorMethod={[VALIDATOR_EMAIL()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Email Login*'
          initValue={data.email || ''}
          initIsValid={data.email}
        />

        <div className={styles.CompanyIndustry}>
          <p>
            <strong>Bidang industri perusahaan</strong>
          </p>
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
            getOptionLabel={(option) => `${option.industry}`}
            value={industry || null}
            onChange={onAutoCompleteHandler}
            inputValue={inputIndustry}
            onInputChange={onInputChangeHandler}
            renderInput={(params) => <CustomTextField {...params} />}
          />
        </div>

        <Input
          inputType='input'
          id='address'
          inputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Alamat Perusahaan*'
        />

        <Input
          inputType='input'
          id='NPWP'
          inputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='NPWP'
        />

        <Input
          inputType='input'
          id='website'
          inputClass='AddJobInput'
          validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Website (optional)'
          initIsValid={true}
        />

        <Input
          inputType='textarea'
          id='briefDescriptions'
          InputClass='EditProfileTextArea'
          validatorMethod={[VALIDATOR_MINLENGTH(20)]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Deskripsi Perusahaan'
          rows={11}
          style={{ borderRadius: '10px', borderColor: '#f79f35', padding: '5px', outline: 'none' }}
        />

        <div className={styles.SubmitButtonContainer}>
          <button disabled={!formState.formIsValid} type='submit'>
            Save & Next
          </button>
        </div>
      </form>
    );
  }
  return (
    <div>
      <h1>Form Data Perusahaan</h1>
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
    getOneCompany: (data) => dispatch(actionCreators.getOneCompany(data)),
    updateCompanyIntro: (payload) => dispatch(actionCreators.updateCompanyIntro(payload)),
    updateCompanyBriefDescriptions: (payload) => dispatch(actionCreators.updateCompanyBriefDescriptions(payload)),
    updateCompanyLogo: (payload) => dispatch(actionCreators.updateCompanyLogo(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegistrationDetailsForm));
