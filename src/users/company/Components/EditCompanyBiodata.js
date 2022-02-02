import React, { useEffect, useState, Fragment } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../../shared/utils/useForm';

import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions/index';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_ALWAYSTRUE } from '../../../shared/utils/validator';

import Autocomplete from '@mui/material/Autocomplete';
import { CustomTextField } from '../../../shared/UI_Element/CustomMUIComponents';
import Input from '../../../shared/UI_Element/Input';
import Modal from '../../../shared/UI_Element/Modal';
import IndustryData from '../../../shared/UI_Element/IndustryData';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';

import styles from './EditCompanyBiodata.module.scss';

const EditCompanyBiodata = (props) => {
  const { companyid } = useParams();

  const [data, setData] = useState();
  const [industry, setIndustry] = useState([]);
  const [inputIndustry, setInputIndustry] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOneCompany } = props;
  useEffect(() => {
    getOneCompany({ userId: companyid }).then((res) => {
      setData(res.company);
      // setIndustry({ industry: res.company.industry });
    });
  }, [getOneCompany, companyid]);

  const [formState, onInputHandler] = useForm(
    {
      companyName: {
        value: data ? data.companyName : null,
        isValid: data && data.companyName ? true : false,
      },
      email: {
        value: data ? data.email : null,
        isValid: data && data.email ? true : false,
      },
      industry: {
        value: data ? data.industry : null,
        isValid: data && data.industry ? true : false,
      },
      NPWP: {
        value: data ? data.NPWP : null,
        isValid: true,
      },
      address: {
        value: data ? data.address : null,
        isValid: data && data.address ? true : false,
      },
      website: {
        value: data ? data.website : null,
        isValid: true,
      },
    },
    true
  );

  useEffect(() => {
    const arrayOfIndustry = industry.map((item) => item.industry);
    onInputHandler('industry', arrayOfIndustry, arrayOfIndustry.length > 0);
  }, [onInputHandler, industry]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateCompanyFail();
    }

    const updatedIntro = {
      companyId: companyid,

      companyName: formState.inputs.companyName.value,
      email: formState.inputs.email.value,
      industry: formState.inputs.industry.value,
      address: formState.inputs.address.value,
      website: formState.inputs.website.value,
      NPWP: formState.inputs.NPWP.value,
      token: props.auth.token || props.admin.token,
    };
    try {
      await props.updateCompanyIntro(updatedIntro);
      props.onCancel();
      props.fetchCompany();
    } catch (err) {
      console.log(err);
    }
  };

  const onAutoCompleteHandler = (event, newValue) => {
    if (inputIndustry) {
      setIndustry((prev) => [...prev, { industry: inputIndustry }]);
    } else {
      setIndustry(newValue);
    }
    const arrayOfIndustry = newValue.map((item) => item.industry);
    onInputHandler('industry', arrayOfIndustry, arrayOfIndustry.length > 0);
  };
  const onInputChangeHandler = (event, newValue) => {
    setInputIndustry(newValue);
  };

  let formContent = <LoadingBar />;

  if (!props.isLoading && data) {
    formContent = (
      <form onSubmit={onSubmitHandler} className={styles.EditBiodataForm}>
        <Input
          inputType='input'
          id='companyName'
          inputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Nama Perusahaan*'
          initValue={data.companyName || ''}
          initIsValid={!!data.companyName}
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
          initIsValid={!!data.email}
        />

        <div className={styles.CompanyIndustry}>
          <p>Bidang industri perusahaan</p>

          <Autocomplete
            id='industry'
            name='industry'
            multiple
            limitTags={4}
            disableCloseOnSelect
            getOptionDisabled={() => industry.length >= 4}
            freeSolo
            options={IndustryData.sort((a, b) => {
              const optA = a.industry.toLowerCase();
              const optB = b.industry.toLowerCase();
              if (optA < optB) return -1;
              if (optA > optB) return 1;
              return 0;
            })}
            onChange={onAutoCompleteHandler}
            value={industry || []}
            onInputChange={onInputChangeHandler}
            getOptionLabel={(option) => `${option.industry}`}
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
          initValue={data.address || ''}
          initIsValid={!!data.address}
        />

        <Input
          inputType='input'
          id='NPWP'
          inputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='NPWP'
          initValue={data.NPWP || ''}
          initIsValid={!!data.NPWP}
        />

        <Input
          inputType='input'
          id='website'
          inputClass='AddJobInput'
          validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Website'
          initValue={data.website || ''}
          initIsValid={true}
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
    updateCompanyIntro: (CompanyData) => dispatch(actionCreators.updateCompanyIntro(CompanyData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditCompanyBiodata));
