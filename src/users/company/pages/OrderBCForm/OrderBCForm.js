import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../../../shared/utils/useForm';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import {
  VALIDATOR_MIN,
  VALIDATOR_EMAIL,
  VALIDATOR_ALWAYSTRUE,
  VALIDATOR_MAX,
} from '../../../../shared/utils/validator';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Modal from '../../../../shared/UI_Element/Modal';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import University from '../../../../shared/UI_Element/UniversityData';
import Input from '../../../../shared/UI_Element/Input';
import OrderModal from '../../../../shared/UI_Element/OrderModal';
import WorkFieldData from '../../../../shared/UI_Element/WorkFieldData';

import classes from './OrderBCForm.module.css';

const ORIGINAL_PRICE = 40000;

const OrderBCForm = (props) => {
  const [employment, setEmployment] = useState('');
  const [open, setOpen] = useState(false);
  const [orderModal, setOrderModal] = useState(false);

  const [formState, onInputHandler] = useForm(
    {
      education: {
        value: [],
        isValid: false,
      },
      gender: {
        value: '',
        isValid: false,
      },
      note: {
        value: '',
        isValid: true,
      },
      jobFunction: {
        value: '',
        isValid: false,
      },
      emailRecipient: {
        value: '',
        isValid: false,
      },
      amount: {
        value: '',
        isValid: false,
      },
      location: {
        value: false,
        isValid: true,
      },
      shift: {
        value: false,
        isValid: true,
      },
      min: {
        value: '',
        isValid: false,
      },
      max: {
        value: '',
        isValid: false,
      },
      IPK: {
        value: '',
        isValid: false,
      },
      school: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.createOrderFail();
    }

    if (!props.auth.isActive) {
      throw new Error('Perusahaan anda masih dalam proses verifikasi admin');
    }

    const orderData = {
      invoiceId: props.auth.userId.slice(0, 6),
      companyId: props.auth.userId,
      token: props.auth.token,
      education: formState.inputs.education.value,
      gender: formState.inputs.gender.value,
      location: formState.inputs.location.value,
      shift: formState.inputs.shift.value,
      min: formState.inputs.min.value,
      max: formState.inputs.max.value,
      note: formState.inputs.note.value,
      jobFunction: formState.inputs.jobFunction.value,
      emailRecipient: formState.inputs.emailRecipient.value,
      amount: formState.inputs.amount.value,
    };

    setOrderModal(false);

    try {
      const res = await props.createOrderCandidate(orderData);
      if (res) {
        console.log(res);
        props.history.push(`/co/${res.order.id}/invoice`);
      } else {
        console.log('no res detected');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const genderHandler = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
  };

  const checkHandler = (e) => {
    const element = document.getElementById(e.target.name);
    onInputHandler(e.target.name, element.checked, true);
  };

  const handleChange = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setEmployment(e.target.value);
  };

  const educationHandler = (e) => {
    let tempArray = [...formState.inputs.education.value];
    if (e.target.checked) {
      tempArray = [...tempArray, e.target.value];
    } else {
      tempArray = tempArray.filter((el) => el !== e.target.value);
    }
    return [tempArray, onInputHandler('education', tempArray, true)];
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onCloseOrderModal = () => {
    setOrderModal(false);
  };

  const onOpenOrderModal = () => {
    setOrderModal(true);
  };

  const handleSchoolChange = (e, value) => {
    onInputHandler('school', value, true);
  };

  let price;

  if (formState.inputs.amount.value <= 1) price = ORIGINAL_PRICE;
  if (formState.inputs.amount.value > 1)
    price = ORIGINAL_PRICE - ORIGINAL_PRICE * 0.1;
  if (formState.inputs.amount.value > 4)
    price = ORIGINAL_PRICE - ORIGINAL_PRICE * 0.2;
  if (formState.inputs.amount.value > 9)
    price = ORIGINAL_PRICE - ORIGINAL_PRICE * 0.3;

  let formContent = <SpinnerCircle />;

  if (!props.isLoading) {
    formContent = (
      <React.Fragment>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Order bulk candidates</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <div className={classes.Inputs}>
                <div className={classes.RadioGroup}>
                  <p className={classes.RadioLabel}>Pendidikan</p>
                  <div
                    className={classes.RadioGroupInput}
                    onChange={educationHandler}
                  >
                    <input
                      type='checkbox'
                      value='SMA'
                      name='education'
                      className={classes.RadioValue}
                    />{' '}
                    <p className={classes.RadioText}>SMA</p>
                    <input
                      type='checkbox'
                      value='SMK'
                      name='education'
                      className={classes.RadioValue}
                    />{' '}
                    <p className={classes.RadioText}>SMK</p>
                    <input
                      type='checkbox'
                      value='D3'
                      name='education'
                      className={classes.RadioValue}
                    />{' '}
                    <p className={classes.RadioText}>D3</p>
                    <input
                      type='checkbox'
                      value='S1'
                      name='education'
                      className={classes.RadioValue}
                    />{' '}
                    <p className={classes.RadioText}>S1</p>
                    <input
                      type='checkbox'
                      value='S2'
                      name='education'
                      className={classes.RadioValue}
                    />{' '}
                    <p className={classes.RadioText}>S2</p>
                    <input
                      type='checkbox'
                      value='S3'
                      name='education'
                      className={classes.RadioValue}
                    />{' '}
                    <p className={classes.RadioText}>S3</p>
                  </div>
                </div>

                <div className={classes.AgeWraper}>
                  <p className={classes.AgeLabel}>Umur</p>
                  <div className={classes.AgeGroup}>
                    <Input
                      inputType='number'
                      id='min'
                      InputClass='Age'
                      validatorMethod={[VALIDATOR_MIN(1)]}
                      onInputHandler={onInputHandler}
                      type='number'
                      initValue='0'
                      min='0'
                      step='1'
                      label='Min'
                    />
                    <Input
                      InputType='number'
                      id='max'
                      InputClass='Age'
                      labelClass='Range'
                      validatorMethod={[VALIDATOR_MIN(1)]}
                      onInputHandler={onInputHandler}
                      type='number'
                      initValue='0'
                      min='0'
                      step='1'
                      label='Max'
                    />
                  </div>
                </div>
              </div>

              <div className={classes.Inputs}>
                <div onChange={genderHandler} className={classes.RadioGroup}>
                  <p className={classes.RadioLabel}>Jenis kelamin</p>
                  <div className={classes.RadioGroupInput}>
                    <input
                      type='radio'
                      value='pria'
                      name='gender'
                      className={classes.RadioValue}
                    />{' '}
                    <p className={classes.RadioText}>Pria</p>
                    <input
                      type='radio'
                      value='wanita'
                      name='gender'
                      className={classes.RadioValue}
                    />{' '}
                    <p className={classes.RadioText}>Wanita</p>
                    <input
                      type='radio'
                      value='bebas'
                      name='gender'
                      className={classes.RadioValue}
                    />{' '}
                    <p className={classes.RadioTextGender}>Keduanya</p>
                  </div>
                </div>

                <div className={classes.CandidateAmount}>
                  <Input
                    inputType='number'
                    id='amount'
                    InputClass='Amount'
                    validatorMethod={[VALIDATOR_MIN(1)]}
                    onInputHandler={onInputHandler}
                    type='number'
                    initValue='0'
                    min='0'
                    step='1'
                    label='Jumlah kandidat*'
                  />
                </div>
              </div>

              <div className={classes.EducationalInput}>
                <div className={classes.DropDownDiv}>
                  <Autocomplete
                    id='school'
                    name='school'
                    options={University.map((option) => option)}
                    onChange={handleSchoolChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Nama sekolah/ universitas*'
                        margin='normal'
                        variant='standard'
                      />
                    )}
                  />
                </div>

                <div className={classes.IPK}>
                  <Input
                    inputType='input'
                    label='IPK'
                    id='IPK'
                    validatorMethod={[VALIDATOR_MAX(4), VALIDATOR_MIN(0)]}
                    onInputHandler={onInputHandler}
                    error={false}
                    type='number'
                    min={0}
                    max={4}
                    step='0.1'
                    helperText={
                      formState.inputs.IPK.value < 0
                        ? 'Nilai IPK min 0'
                        : formState.inputs.IPK.value > 4
                        ? 'Nilai IPK max 4'
                        : 'IPK wajib diisi'
                    }
                  />
                </div>
              </div>

              <div className={classes.CheckInputs}>
                <div className={classes.CheckGroup}>
                  <input
                    type='checkbox'
                    value={formState.inputs.location.value}
                    name='location'
                    id='location'
                    className={classes.CheckValue}
                    onChange={checkHandler}
                  />
                  <p className={classes.CheckText}>
                    Bersedia ditempatkan diluar kota asal
                  </p>
                </div>
                <div className={classes.CheckGroup}>
                  <input
                    type='checkbox'
                    value={formState.inputs.location.value}
                    name='shift'
                    id='shift'
                    className={classes.CheckValue}
                    onChange={checkHandler}
                  />
                  <p className={classes.CheckText}>
                    Bersedia bekerja secara shift
                  </p>
                </div>
              </div>

              <div>
                <FormControl
                  className={classes.formControl}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  <InputLabel id='jobFunction'>Bidang pekerjaan</InputLabel>

                  <Select
                    labelId='jobFunction'
                    id='jobFunction'
                    name='jobFunction'
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={employment}
                    onChange={handleChange}
                    style={{
                      fontSize: '0.9rem',
                      textAlign: 'left',
                      paddingBottom: '0.15rem',
                      color: 'black',
                    }}
                  >
                    <MenuItem value='' style={{ fontSize: '0.9rem' }}>
                      <em>Belum ada untuk saat ini</em>
                    </MenuItem>
                    {WorkFieldData.sort().map((work, i) => {
                      return (
                        <MenuItem
                          id={i}
                          value={work}
                          style={{ fontSize: '0.9rem' }}
                          key={i}
                        >
                          {work}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <Input
                  inputType='input'
                  id='emailRecipient'
                  inputClass='Position'
                  validatorMethod={[VALIDATOR_EMAIL()]}
                  onInputHandler={onInputHandler}
                  label='Email penerima*'
                />
              </div>

              <Input
                inputType='textarea'
                id='note'
                InputClass='JobSpec'
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onInputHandler={onInputHandler}
                label='Catatan tambahan*'
                initIsValid={true}
              />

              <div className={classes.FooterSection}>
                <div className={classes.PriceDescription}>
                  <div className={classes.PackageDesc}>
                    Untuk pemesanan kandidat, konsumen akan diberikan diskon
                    untuk setiap kelipatan tertentu:
                    <p>1. pemesanan 2-4 diskon (10%)</p>
                    <p>2. pemesanan 5-9 diskon (20%)</p>
                    <p>3. pemesanan lebih dari 9 diskon (30%)</p>
                  </div>
                </div>
                <div className={classes.PriceHolder}>
                  <div
                    className={classes.InputAmount}
                    style={{ borderBottom: '1px solid black' }}
                  >
                    <p className={classes.Label}>Harga per slot:</p>
                    <p className={classes.InputSlot}>
                      IDR {price.toLocaleString()}
                    </p>
                  </div>
                  <div className={classes.InputAmount}>
                    <p className={classes.Label}>Total:</p>
                    <p className={classes.InputSlot}>
                      <strong>
                        IDR{' '}
                        {(
                          price * formState.inputs.amount.value
                        ).toLocaleString()}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.Footer}>
            <Button
              disabled={!formState.formIsValid}
              variant='contained'
              color='primary'
              type='button'
              onClick={onOpenOrderModal}
            >
              Save
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  const onCancelHandler = () => {
    props.resetOrder();
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Tidak dapat melakukan pembelian saat ini{' '}
      </Modal>
      <OrderModal
        show={orderModal}
        onCancel={onCloseOrderModal}
        Accept={onSubmitHandler}
      >
        Buat pesanan sekarang?
      </OrderModal>
      {formContent}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoading: state.finance.isLoading,
    error: state.finance.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrderCandidate: (data) =>
      dispatch(actionCreators.createOrderCandidate(data)),
    createOrderFail: () =>
      dispatch({ type: actionTypes.CREATEORDERCANDIDATEFAIL }),
    resetOrder: () => dispatch({ type: actionTypes.ORDERRESET }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderBCForm));
