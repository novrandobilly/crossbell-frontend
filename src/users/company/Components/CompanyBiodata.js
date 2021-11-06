import React from 'react';

import BlankProfile from '../../../assets/images/Blank_Profile.png';
import Verified from '../../../assets/icons/verified.svg';
import Location from '../../../assets/icons/location.svg';
import World from '../../../assets/icons/world.svg';
import styles from './CompanyBiodata.module.scss';

const CompanyBiodata = props => {
  const checkURL = websiteUrl => {
    let isValid = false;
    isValid = isValid || websiteUrl.slice(0, 8) === 'https://';
    isValid = isValid || websiteUrl.slice(0, 7) === 'http://';
    if (isValid) return websiteUrl;
    return `http://${websiteUrl}`;
  };

  const noInformation = <em style={{ color: '#737373' }}>tidak ada informasi</em>;
  return (
    <div className={styles.CompanyBiodataContainer}>
      <img className={styles.BiodataImageContainer} alt='Company Logo' src={props.logo.url || BlankProfile} />
      <div className={styles.CompanyBiodataInformation}>
        <h2>
          {props.companyName ? props.companyName : noInformation}{' '}
          {props.isActive ? (
            <img alt='Verified' src={Verified} className={styles.VerificationSign} />
          ) : (
            <span className={styles.VerificationSign}>Verification in progress</span>
          )}
        </h2>
        <h3>Industri: {props.industry ? props.industry : noInformation}</h3>
        <p>
          <img className={styles.BioIcon} alt='Location Icon' src={World} />

          <a target='_blank' rel='noreferrer' href={props.website ? checkURL(props.website) : '#'}>
            {props.website ? props.website : noInformation}
          </a>
        </p>
        <p>
          <img className={styles.BioIcon} alt='Location Icon' src={Location} />
          {props.address ? props.address : noInformation}
        </p>
        <p>Sisa Slot: {props.slot}</p>
      </div>
    </div>
  );
};

export default CompanyBiodata;
