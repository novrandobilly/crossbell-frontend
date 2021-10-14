import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../../../shared/utils/useForm';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions';
import { VALIDATOR_ALWAYSTRUE } from '../../../../shared/utils/validator';
import Button from '@material-ui/core/Button';
import Modal from '../../../../shared/UI_Element/Modal';
import Spinner from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../../shared/UI_Element/Input';

import classes from './Language.module.css';

const Language = props => {
  const [language, setLanguages] = useState(['language']);
  const [languagesList, setLanguagesList] = useState([{}]);

  const [formState, onInputHandler] = useForm([], true);
  const { applicantid } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOneApplicant } = props;
  useEffect(() => {
    let res;
    const fetchApp = async () => {
      const payload = {
        applicantId: applicantid,
        token: props.auth.token,
      };

      res = await getOneApplicant(payload);

      res.applicant.languages.forEach((language, i) => {
        setLanguages(prevState => [...prevState, 'language']);
      });

      setLanguagesList(res.applicant.languages);
    };

    if (props.auth.token) {
      fetchApp();
    }
  }, [getOneApplicant, applicantid, onInputHandler, props.auth.token]);

  useEffect(() => {
    onInputHandler('language', languagesList, true);
  }, [onInputHandler, languagesList]);

  const onSubmitHandler = async event => {
    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    event.preventDefault();

    const updatedData = {
      applicantId: applicantid,
      languagesData: formState.inputs.language.value,
      token: props.auth.token,
    };

    await props.updateApplicantLanguages(updatedData);
    props.history.push(`/ap/${applicantid}/profile`);
  };

  const addLanguage = e => {
    e.preventDefault();
    setLanguages(language => [...language, 'language']);
  };

  const onUpdateLang = (event, i, type) => {
    let inputValue = event.target.value;

    setLanguagesList(prevState => {
      let newState = [...prevState];
      if (typeof newState[i] !== 'object') newState[i] = {};
      newState[i][type] = inputValue;
      return newState;
    });
  };

  console.log(languagesList);

  let formLanguages = <Spinner />;
  if (languagesList && !props.applicant.isLoading) {
    formLanguages = (
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Ubah Kemampuan Bahasa</p>

          {language.map((language, i) => {
            return (
              <div className={classes.FormRow} key={i}>
                <div className={classes.LanguageDiv}>
                  <Input
                    inputType='input'
                    id={`language_${i}`}
                    validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                    onChange={e => onUpdateLang(e, i, 'langName')}
                    initIsValid={true}
                    label='Bahasa Yang Dikuasai'
                    value={languagesList[i]?.langName}
                  />
                </div>

                <div className={classes.RatingDiv}>
                  <Input
                    inputType='input'
                    id={`rating_${i}`}
                    validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                    onChange={e => onUpdateLang(e, i, 'rate')}
                    initIsValid={true}
                    type='number'
                    label='Rate'
                    min='0'
                    max='5'
                    step='1'
                    value={languagesList[i]?.rate}
                  />
                </div>
                {/* <Slider
                  id={`rate_${i}`}
                  defaultValue={0}
                  aria-labelledby='discrete-slider-small-steps'
                  step={1}
                  marks
                  min={0}
                  max={5}
                  onChange={(e) => onUpdateLang(e, i, 'rate')}
                  valueLabelDisplay='auto'
                /> */}
              </div>
            );
          })}

          <Button variant='contained' color='primary' type='button' disableElevation onClick={addLanguage} size='small'>
            Add Input
          </Button>

          <div className={classes.Footer}>
            <Button
              // disabled={!formState.formIsValid}
              variant='contained'
              color='primary'
              type='submit'>
              Save
            </Button>
          </div>
        </div>
      </form>
    );
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <React.Fragment>
      {' '}
      <Modal show={props.error} onCancel={onCancelHandler}>
        Could not update changes at the moment, please try again later
      </Modal>
      {formLanguages}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    applicant: state.applicant,
    isLoading: state.applicant.isLoading,
    error: state.applicant.error,
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateApplicantLanguages: payload => dispatch(actionCreators.updateApplicantLanguages(payload)),
    getOneApplicant: applicantid => dispatch(actionCreators.getOneApplicant(applicantid)),
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    updateApplicantFail: () => dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Language));
