import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter, Link } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_MINLENGTH } from '../../../../shared/utils/validator';

import Button from '@material-ui/core/Button';
import Modal from '../../../../shared/UI_Element/Modal';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../../shared/UI_Element/Input';

import classes from './EditSummary.module.css';

const EditSummary = props => {
  const { applicantid } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOneApplicant } = props;
  useEffect(() => {
    const payload = {
      applicantId: applicantid,
      token: props.auth.token,
    };
    if (props.auth.token) {
      getOneApplicant(payload).then(res => {
        setData(res.applicant);
      });
    }
  }, [getOneApplicant, applicantid, props.auth.token]);

  const [formState, onInputHandler] = useForm(
    {
      details: {
        value: data ? data.details : null,
        isValid: data && data.details ? true : false,
      },
    },
    false
  );

  const onSubmitHandler = async event => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    const updatedAppSummary = {
      applicantId: applicantid,
      details: formState.inputs.details.value,
      token: props.auth.token,
    };
    try {
      const res = await props.updateApplicantSummary(updatedAppSummary);
      console.log(res);
      if (res) {
        console.log(res);
      } else {
        console.log('no res detected');
      }
      props.history.push(`/ap/${applicantid}/profile`);
    } catch (err) {
      console.log(err);
    }
  };

  let formContent = <LoadingBar />;

  if (!props.isLoading && data) {
    formContent = (
      <React.Fragment>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Tentang saya</p>

          <div className={classes.FormRow}>
            <p className={classes.Tips}>
              *Ceritakan secara singkat tentang diri anda yang membuat perusahaan pencari tenaga kerja menjadi tertarik untuk mengundang
              anda mengikuti proses seleksi. Hal penting harus anda uraikan adalah hubungan antara karakter, minat, dan kualifikasi yang
              kamu miliki saat ini disertai dengan rancangan dirimu di masa depan. Hal itu bisa dipaparkan dengan menceritakan pengalaman
              masa lalu anda terkait karakter dan kompetensi yang anda miliki.
            </p>
            <div className={classes.EditLabel}>
              <Input
                inputType='textarea'
                id='details'
                inputClass='EditProfileTextArea'
                validatorMethod={[VALIDATOR_MINLENGTH(20)]}
                onInputHandler={onInputHandler}
                label='Rincian*'
                initValue={data.details}
                initIsValid={true}
                rows={14}
                helperText='Rincian setidaknya berjumlah 20 karakter'
              />
            </div>
          </div>
          <div className={classes.Footer}>
            <Link to={`/ap/${applicantid}/profile`}>
              <Button variant='outlined' type='Button' disableElevation style={{ marginRight: '16px' }}>
                Back
              </Button>
            </Link>
            <Button disabled={!formState.formIsValid} variant='contained' color='primary' type='submit'>
              Save
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Could not update changes at the moment, please try again later
      </Modal>
      {formContent}
    </form>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.applicant.isLoading,
    error: state.applicant.error,
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateApplicantFail: () => dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    getOneApplicant: data => dispatch(actionCreators.getOneApplicant(data)),
    updateApplicantSummary: ApplicantData => dispatch(actionCreators.updateApplicantSummary(ApplicantData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditSummary));
