import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';

import Modal from '../../../shared/UI_Element/Modal';
import EditCompanyBiodata from './EditCompanyBiodata';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import BlankProfile from '../../../assets/images/Blank_Profile.png';
import Verified from '../../../assets/icons/verified.svg';
import Location from '../../../assets/icons/location.svg';
import World from '../../../assets/icons/world.svg';
import EditWhiteIcon from '../../../assets/icons/edit-white.svg';
import styles from './CompanyBiodata.module.scss';

const CompanyBiodata = props => {
  const [openEditBiodata, setOpenEditBiodata] = useState(false);
  const [uploadIsLoading, setUploadIsLoading] = useState(false);

  const openEditBiodataHandler = () => setOpenEditBiodata(true);
  const closeEditBiodataHandler = () => setOpenEditBiodata(false);

  const checkURL = websiteUrl => {
    let isValid = false;
    isValid = isValid || websiteUrl.slice(0, 8) === 'https://';
    isValid = isValid || websiteUrl.slice(0, 7) === 'http://';
    if (isValid) return websiteUrl;
    return `http://${websiteUrl}`;
  };

  const onUploadHandler = async e => {
    setUploadIsLoading(true);
    const elementFile = e.target.files[0];
    const payload = {
      companyId: props.auth.userId,
      token: props.auth.token,
      logo: elementFile,
    };
    try {
      await props.updateCompanyLogo(payload);
      props.fetchCompany();
      setUploadIsLoading(false);
    } catch (err) {
      console.log(err);
      setUploadIsLoading(false);
    }
  };

  const noInformation = <em style={{ color: '#737373' }}>tidak ada informasi</em>;
  return (
    <Fragment>
      <Modal
        show={openEditBiodata}
        onCancel={closeEditBiodataHandler}
        headerText='Edit Biodata Perusahaan'
        style={{ top: '20vh', maxWidth: '600px', marginLeft: '-300px', height: '60vh', overflowY: 'auto' }}>
        <EditCompanyBiodata fetchCompany={props.fetchCompany} onCancel={closeEditBiodataHandler} />
      </Modal>
      <div className={styles.CompanyBiodataContainer}>
        <label className={styles.CompanyLogo} htmlFor='CompanyLogo'>
          {uploadIsLoading ? (
            <LoadingBar />
          ) : (
            <Fragment>
              <img
                className={styles.BiodataImageContainer}
                alt='Company Logo'
                src={props.logo ? props.logo.url : BlankProfile}
              />

              <input
                accept='.jpg, .jpeg, .png'
                name='CompanyLogo'
                id='CompanyLogo'
                type='file'
                style={{ display: 'none' }}
                onChange={onUploadHandler}
              />
            </Fragment>
          )}
        </label>

        <div className={styles.CompanyBiodataInformation}>
          <h2>
            {props.companyName ? props.companyName : noInformation}{' '}
            {props.isActive ? (
              <img alt='Verified' src={Verified} className={styles.VerificationSign} />
            ) : (
              <span className={styles.VerificationSign}>(Sedang dalam proses verifikasi)</span>
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
          <p>Sisa Slot: {props.remainingSlot}</p>
        </div>
        {props.auth.userId === props.companyId && (
          <span className={styles.AddEditButton} onClick={openEditBiodataHandler}>
            <img alt='Edit Button' src={EditWhiteIcon} />
          </span>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCompanyLogo: payload => dispatch(actionCreators.updateCompanyLogo(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyBiodata);
