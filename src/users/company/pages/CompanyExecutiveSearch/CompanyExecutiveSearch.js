import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../../../shared/utils/useForm';

import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../../shared/utils/validator';

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import classes from './CompanyExecutiveSearch.module.css';
import TextField from '@material-ui/core/TextField';
import Input from '../../../../shared/UI_Element/Input';
import Modal from '../../../../shared/UI_Element/Modal';
import IndustryData from '../../../../shared/UI_Element/IndustryData';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';

const CompanyExecutiveSearch = props => {
  const [industry, setIndustry] = useState('');
  const [successModal, setSuccessModal] = useState(false);

  const filter = createFilterOptions();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let push = props.push;

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
      if (res.order) {
        setSuccessModal(true);
        props.history.push(`/`);
      } else {
        return props.createOrderFail();
      }
    } catch (err) {
      console.log(err);
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

  const onFilterHandler = (options, params) => {
    const filtered = filter(options, params);

    if (params.inputValue !== '') {
      filtered.push({
        inputValue: params.inputValue,
        industry: `Tambahkan "${params.inputValue}"`,
      });
    }

    return filtered;
  };

  let formContent = <LoadingBar />;

  if (!props.isLoading) {
    formContent = (
      <React.Fragment>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Cari Kandidat Eksekutif</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <div className={classes.InputBox}>
                <Input
                  inputType='input'
                  id='name'
                  inputClass='AddJobInput'
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label='Nama*'
                  helperText='Nama contact person wajib diisi'
                />
              </div>
              <div className={classes.InputBox}>
                <Input
                  inputType='input'
                  id='email'
                  name='email'
                  inputClass='AddJobInput'
                  validatorMethod={[VALIDATOR_EMAIL()]}
                  onInputHandler={onInputHandler}
                  label='Email*'
                  helperText='Mohon masukkan alamat email yang valid'
                />
              </div>

              <div className={classes.InputBox}>
                <Input
                  inputType='input'
                  id='phone'
                  inputClass='AddJobInput'
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label='Nomor Telepon*'
                  helperText='Nomor telepon wajib diisi'
                />
              </div>

              <div className={classes.InputBox}>
                <Input
                  inputType='input'
                  id='companyName'
                  inputClass='AddJobInput'
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label='Nama Perusahaan*'
                  helperText='Nama perusahaan wajib diisi'
                />
              </div>

              <div className={classes.InputBox}>
                <Autocomplete
                  value={industry}
                  onChange={onAutoCompleteHandler}
                  filterOptions={onFilterHandler}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id='industry'
                  name='industry'
                  ccc='true'
                  options={IndustryData}
                  getOptionLabel={option => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.industry;
                  }}
                  renderOption={option => option.industry}
                  freeSolo
                  style={{ margin: '0', width: '100%' }}
                  renderInput={params => (
                    <TextField {...params} style={{ margin: '0' }} label='Industri Perusahaan*' margin='normal' variant='standard' />
                  )}
                />
              </div>

              <div className={classes.InputBox}>
                <Input
                  inputType='textarea'
                  id='candidateRequirement'
                  validatorMethod={[VALIDATOR_MINLENGTH(0)]}
                  onInputHandler={onInputHandler}
                  label='Persyaratan Minimum Kandidat'
                  rows={3}
                  initIsValid={true}
                />
              </div>

              <div className={classes.InputBox}>
                <Input
                  inputType='textarea'
                  id='specialRequirement'
                  validatorMethod={[VALIDATOR_MINLENGTH(0)]}
                  onInputHandler={onInputHandler}
                  label='Persyaratan Lainnya'
                  rows={3}
                  initIsValid={true}
                />
              </div>
            </div>
          </div>

          <div className={classes.Footer}>
            <Button
              disabled={!formState.formIsValid}
              variant='contained'
              color='primary'
              type='submit'
              className={classes.button}
              endIcon={<NavigateNextIcon />}>
              Kirim Pesanan
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  const onCancelHandler = () => {
    props.resetCompany();
  };

  const onUnderstand = () => {
    setSuccessModal(false);
  };

  return (
    <div className={!push ? classes.EditIntro : classes.AddIntro}>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <Modal show={props.error} onCancel={onCancelHandler}>
          Could not update changes at the moment, please try again later
        </Modal>
        <Modal show={successModal} onCancel={onUnderstand}>
          Pesanan anda telah terkirim, kami akan segera memproses pesanan dan menghubungi anda kembali.
        </Modal>
        {formContent}
      </form>
    </div>
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
    createRequest: payload => dispatch(actionCreators.createOrderES(payload)),
    createOrderFail: () => dispatch({ type: actionTypes.CREATEORDERCANDIDATEFAIL }),
    resetOrder: () => dispatch({ type: actionTypes.ORDERRESET }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CompanyExecutiveSearch));
