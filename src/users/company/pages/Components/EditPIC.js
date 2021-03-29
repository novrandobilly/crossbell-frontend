import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../../../shared/utils/useForm';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from '../../../../shared/utils/validator';

import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Modal from '../../../../shared/UI_Element/Modal';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../../../shared/UI_Element/Input';

import classes from './EditPIC.module.css';

const EditPIC = (props) => {
  const { companyid } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOneCompany } = props;
  useEffect(() => {
    getOneCompany({ userId: companyid }).then((res) => {
      setData(res.company);
    });
  }, [getOneCompany, companyid]);

  let push = props.push;

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

  const onSubmitHandler = async (event) => {
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
      token: props.auth.token,
    };
    try {
      const res = await props.updateCompanyPIC(updatedData);
      if (res) {
        console.log(res);
      } else {
        console.log('no res detected');
      }
      props.history.push(`/co/${companyid}`);
    } catch (err) {
      console.log(err);
    }
  };

  let formContent = <SpinnerCircle />;

  if (!props.isLoading && data) {
    formContent = (
      <React.Fragment>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Edit Contact Person</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <div className={classes.InputBox}>
                <Input
                  inputType='input'
                  id='picName'
                  InputClass='AddJobInput'
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label='Nama lengkap*'
                  initValue={data.picName}
                  initIsValid={data.picName}
                  helperText='Nama lengkap wajib diisi'
                />
              </div>
              <div className={classes.InputBox}>
                <Input
                  inputType='input'
                  id='picJobTitle'
                  InputClass='AddJobInput'
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label='Posisi*'
                  initValue={data.picJobTitle}
                  initIsValid={data.picJobTitle}
                  helperText='Posisi dalam perusahaan wajib diisi'
                />
              </div>
              <div className={classes.InputBox}>
                <Input
                  inputType='input'
                  id='picEmail'
                  InputClass='AddJobInput'
                  validatorMethod={[VALIDATOR_EMAIL()]}
                  onInputHandler={onInputHandler}
                  label=' Email*'
                  initValue={data.picEmail}
                  initIsValid={data.picEmail}
                  helperText='Mohon masukkan email yang valid'
                />
              </div>
              <div className={classes.InputBox}>
                <Input
                  inputType='input'
                  id='picPhone'
                  InputClass='AddJobInput'
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label=' Nomor telepon / Whatsapp*'
                  initValue={data.picPhone}
                  initIsValid={data.picPhone}
                  helperText='Nomor telepon/ WA wajib diisi'
                />
              </div>
              <div className={classes.InputBox}>
                <Input
                  inputType='input'
                  id='picOfficePhone'
                  InputClass='AddJobInput'
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label='Nomor Telepon Kantor*'
                  initValue={data.picPhone}
                  initIsValid={data.picPhone}
                  helperText='Nomor telepon kantor wajib diisi'
                />
              </div>
            </div>
          </div>

          <div className={classes.Footer}>
            {push && (
              <Button
                className={classes.button}
                startIcon={<NavigateBeforeIcon />}
                onClick={props.onBackHandler}
                style={{ marginRight: '2rem' }}
              >
                Back
              </Button>
            )}

            <Button
              disabled={!formState.formIsValid}
              variant='contained'
              color='primary'
              type='submit'
              className={classes.button}
              endIcon={<NavigateNextIcon />}
            >
              Save
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
  const onCancelHandler = () => {
    props.resetCompany();
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <Modal show={props.error} onCancel={onCancelHandler}>
          Could not update changes at the moment, please try again later
        </Modal>
        {formContent}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.company.isLoading,
    error: state.company.error,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCompanyFail: () => dispatch({ type: actionTypes.UPDATECOMPANYFAIL }),
    resetCompany: () => dispatch({ type: actionTypes.COMPANYRESET }),
    getOneCompany: (data) => dispatch(actionCreators.getOneCompany(data)),
    updateCompanyPIC: (CompanyData) =>
      dispatch(actionCreators.updateCompanyPIC(CompanyData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditPIC));
