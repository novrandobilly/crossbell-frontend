import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_MINLENGTH } from '../../../../shared/utils/validator';

import Modal from '../../../../shared/UI_Element/Modal';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../../shared/UI_Element/Input';

import styles from './EditDescription.module.scss';

const EditDescription = props => {
  const { applicantid } = useParams();
  const [characterLength, setCharacterLength] = useState();
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
        setCharacterLength(res.applicant.details.length);
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
      await props.updateApplicantSummary(updatedAppSummary);
      props.onCancel();
      props.fetchApplicantData();
    } catch (err) {
      console.log(err);
    }
  };

  const onCharacterCountHandler = e => {
    const charLength = e.target.value.length;
    setCharacterLength(charLength);
  };

  let formContent = <LoadingBar />;

  if (!props.isLoading && data) {
    formContent = (
      <div className={styles.DescriptionContainer}>
        <div className={styles.DescriptionEdit} onChange={onCharacterCountHandler}>
          <p className={styles.DescriptionTips}>
            *Ceritakan secara singkat tentang diri anda yang membuat perusahaan pencari tenaga kerja menjadi tertarik
            untuk mengundang anda mengikuti proses seleksi. Hal penting yang perlu anda uraikan adalah hubungan antara
            karakter, minat, dan kualifikasi yang anda miliki saat ini disertai dengan rancangan diri anda di masa
            depan. Hal itu bisa dipaparkan dengan menceritakan pengalaman masa lalu anda terkait karakter dan kompetensi
            yang anda miliki.
          </p>
          <p className={styles.DescriptionMaxChar}>(max 1500 karakter)</p>
          <Input
            inputType='textarea'
            id='details'
            inputClass='EditProfileTextArea'
            validatorMethod={[VALIDATOR_MINLENGTH(20)]}
            onInputHandler={onInputHandler}
            label={false}
            initValue={data.details}
            initIsValid={true}
            rows={14}
            helperText='Rincian setidaknya berjumlah 20 karakter'
            style={{ height: '200px' }}
          />
          <p className={styles.DescriptionChar}>{characterLength}/1500 karakter</p>
        </div>
        <div className={styles.ButtonContainer}>
          <button className={styles.BackButton} type='button' onClick={props.onCancel}>
            Back
          </button>

          <button className={styles.SubmitButton} disabled={!formState.formIsValid} type='submit'>
            Save
          </button>
        </div>
      </div>
    );
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <form onSubmit={onSubmitHandler} className={styles.Container}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditDescription));
