import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actionCreators from '../../../store/actions';

import Description from './Description.js';
import Skills from './Skills.js';
import WorkingExperiences from './WorkingExperiences';
import Educations from './Educations';

import BlankProfile from '../../../assets/images/Blank_Profile.png';
import PhoneIcon from '../../../assets/icons/phone.svg';
import AddressIcon from '../../../assets/icons/location.svg';
import EmailIcon from '../../../assets/icons/email.svg';
import MoneyIcon from '../../../assets/icons/money.svg';
import GenderIcon from '../../../assets/icons/gender.svg';
import BirthdayIcon from '../../../assets/icons/birthday-cake.svg';

import styles from './ApplicantProfile.module.scss';

const ApplicantProfile = props => {
  return (
    <div className={styles.ApplicantDetailsContainer}>
      <section className={styles.ApplicantBriefInformation}>
        <div className={styles.ApplicantAvatar}>
          <img alt='Applicant Avatar' src={props.picture ? props.picture.url : BlankProfile} />
        </div>
        <div className={styles.ApplicantBriefDetails}>
          <h2 className={styles.ApplicantFullName}>
            {props.firstName}&nbsp;{props.lastName}
          </h2>
          <h3 className={styles.ApplicantHeadline}>{props.headline}</h3>
          <div className={styles.ApplicantBiodata}>
            <div className={styles.ApplicantBiodataFirstGroup}>
              <p className={styles.ApplicantPhone}>
                <img alt='Phone Icon' src={PhoneIcon} />
                {props.phone}
              </p>
              <p className={styles.ApplicantEmail}>
                <img alt='Email Icon' src={EmailIcon} />
                {props.email}
              </p>
              <p className={styles.ApplicantAddress}>
                <img alt='Address Icon' src={AddressIcon} />
                {props.address}
              </p>
              <p className={styles.ApplicantSalaryExpectation}>
                <img alt='Money Icon' src={MoneyIcon} />
                {`Rp ${props.salary.toLocaleString()},-`}
              </p>
            </div>
            <div className={styles.ApplicantBiodataSecondGroup}>
              <p className={styles.ApplicantGender}>
                <img alt='Gender Icon' src={GenderIcon} />
                {props.gender}
              </p>
              <p className={styles.ApplicantGender}>
                <img alt='Birthday Icon' src={BirthdayIcon} />
                {`${props.dateOfBirth} (X tahun)`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ApplicantDescription}>
        <Description description={props.details} />
      </section>

      <section className={styles.ApplicantSkills}>
        <Skills skills={props.skills} />
      </section>

      <section className={styles.ApplicantWorkingExperiences}>
        <WorkingExperiences experiences={props.experience.sort((a, b) => moment(b.endDate) - moment(a.endDate))} />
      </section>
      <section className={styles.ApplicantEducations}>
        <Educations educations={props.education.sort((a, b) => moment(b.endDate) - moment(a.endDate))} />
      </section>
      <section className={styles.ApplicantOrganizationExperiences}></section>
      <section className={styles.ApplicantCertifications}></section>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    applicant: state.applicant,
    admin: state.admin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateResume: payload => dispatch(actionCreators.updateResume(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantProfile);
