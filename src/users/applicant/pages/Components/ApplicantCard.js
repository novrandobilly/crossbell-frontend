import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actionCreators from '../../../../store/actions';

import Spinner from '../../../../shared/UI_Element/Spinner/Spinner';
import IconButton from '../../../../shared/UI_Element/IconButton';
import TextOnly from '../../../../shared/UI_Element/TextOnly';
import RangeSegment from '../../../../shared/UI_Element/RangeSegment';
import SkillsMap from '../Components/SkillsMap';

import classes from './ApplicantCard.module.css';

const ApplicantCard = (props) => {
  const [resumeFile, setResumeFile] = useState();
  const [loadingResume, setLoadingResume] = useState(false);

  const onUploadHandler = (event) => {
    event.preventDefault();
    setResumeFile(event.target.files[0]);
  };

  const onSubmitResumeHandler = async (event) => {
    setLoadingResume(true);
    event.preventDefault();
    const payload = {
      applicantId: props.auth.userId,
      resume: resumeFile,
      token: props.auth.token,
    };
    try {
      const res = await props.updateResume(payload);
      console.log(res);
      setLoadingResume(false);
    } catch (err) {
      console.log(err);
      setLoadingResume(false);
    }
  };

  return (
    <div className={classes.Pages}>
      <Link to={'/job-dashboard'}>
        <p className={classes.Explore}>Telusuri pekerjaan disini</p>
      </Link>
      <div className={classes.Wraper}>
        <div className={classes.Container}>
          <div className={classes.ApplicantContainer}>
            <div className={classes.ContainerLeft}>
              <Link to={`/ap/${props.id}/intro`}>
                {props.picture ? (
                  <div
                    className={classes.Avatar}
                    style={{
                      backgroundImage: `url('${props.picture.url}')`,
                    }}
                  />
                ) : (
                  <div
                    className={classes.Avatar}
                    style={{
                      backgroundImage: `url('https://res.cloudinary.com/kalkulus/image/upload/v1616503057/Profile_w6vts3.png')`,
                    }}
                  />
                )}
              </Link>

              <div className={classes.ContainerLeftDivider}>
                <p className={classes.Name}>
                  {props.firstName} {props.lastName}
                </p>
                <p className={classes.Title}>{props.headline}</p>
                <p className={classes.Address}>{props.address}</p>

                <p className={classes.Email}>{props.email}</p>
                <p className={classes.Email}>{props.phone}</p>

                <div className={classes.ResumePreview}>
                  {props.resume && (
                    <div className={classes.ResumeHolder}>
                      <img
                        className={classes.ResumePicture}
                        src={`${
                          props.resume.url.slice(
                            0,
                            props.resume.url.length - 4
                          ) + '.jpg'
                        }`}
                        alt='resume-preview'
                      />
                      <a
                        href={
                          props.resume.url.slice(
                            0,
                            props.resume.url.length - 4
                          ) + '.jpg'
                        }
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Preview Resume Here
                      </a>
                    </div>
                  )}
                </div>
                {props.auth.userId === props.id && (
                  <div>
                    <label className={classes.InputButton}>
                      <input
                        type='file'
                        name='resume'
                        id='resume'
                        onChange={onUploadHandler}
                        accept='.pdf'
                        style={{ display: 'none' }}
                      />
                      <span className={classes.InputButtonText}>
                        {' '}
                        Upload Resume{' '}
                      </span>
                    </label>
                  </div>
                )}

                {resumeFile && (
                  <div className={classes.SaveResume}>
                    <p className={classes.FilePreview}>{resumeFile.name}</p>

                    {loadingResume ? (
                      <div className={classes.SaveText}>
                        <Spinner />
                      </div>
                    ) : (
                      <span
                        className={classes.SaveText}
                        onClick={onSubmitResumeHandler}
                      >
                        {' '}
                        Save{' '}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className={classes.ContainerRight}>
              {props.auth.isAdmin && (
                <Link to={`/ad/alphaomega/applicants/${props.id}`}>
                  <button> Jobs Applied </button>
                </Link>
              )}
              {props.auth.userId === props.id && (
                <Link to={`/ap/${props.id}/intro`}>
                  <IconButton />
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className={classes.SegmentContainer}>
          <TextOnly
            id={props.id}
            labelName='Tentang Saya'
            route={`/ap/${props.id}/summary`}
            text={props.details}
            applicantid={props.id}
          />

          <RangeSegment
            id={props.id}
            labelName='Pengalaman'
            routeEdit={`/ap/${props.id}/experience`}
            routeAdd={`/ap/${props.id}/add/experience`}
            contents={props.experience.sort(
              (a, b) => moment(b.startDate) - moment(a.startDate)
            )}
            state='experience'
            isLoading={props.applicant.isLoading}
            token={props.auth.token}
            applicantid={props.id}
          />

          <RangeSegment
            id={props.id}
            labelName='Pendidikan'
            routeEdit={`/ap/${props.id}/education`}
            routeAdd={`/ap/${props.id}/add/education`}
            contents={props.education.sort(
              (a, b) => moment(b.startDate) - moment(a.startDate)
            )}
            state='education'
            isLoading={props.applicant.isLoading}
            token={props.auth.token}
            applicantid={props.id}
          />

          <RangeSegment
            id={props.id}
            labelName='Sertifikasi/ Penghargaan'
            routeEdit={`/ap/${props.id}/certification`}
            routeAdd={`/ap/${props.id}/add/certification`}
            contents={props.certification.sort(
              (a, b) => moment(b.startDate) - moment(a.startDate)
            )}
            state='certification'
            isLoading={props.applicant.isLoading}
            token={props.auth.token}
            applicantid={props.id}
          />

          <SkillsMap
            id={props.id}
            labelName='Keterampilan'
            routeEdit={`/ap/${props.id}/skills`}
            routeAdd={`/ap/${props.id}/add/skills`}
            skills={props.skills}
            token={props.auth.token}
            applicantid={props.id}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    applicant: state.applicant,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateResume: (payload) => dispatch(actionCreators.updateResume(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantCard);
