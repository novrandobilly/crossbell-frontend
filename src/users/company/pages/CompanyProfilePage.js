import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';

import HeaderBanner from '../../../shared/UI_Element/HeaderBanner';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import CompanyMeeting from '../../../assets/images/CompanyMeeting.png';
import CompanyProfile from '../components/CompanyProfile';
import ExecutiveSearchBanner from '../../../shared/UI_Element/ExecutiveSearchBanner';
import ExecutiveSearchImage from '../../../assets/images/ES_Banner_1.jpeg';

import styles from './CompanyProfilePage.module.scss';

const CompanyProfilePage = props => {
  const { companyid } = useParams();
  const [loadedCompany, setLoadedCompany] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOneCompany } = props;

  const getCompany = useCallback(async () => {
    try {
      let res = await getOneCompany({ userId: companyid });
      setLoadedCompany(res.company);
    } catch (err) {
      console.log(err);
    }
  }, [companyid, getOneCompany]);

  useEffect(() => {
    getCompany();
  }, [getCompany]);

  let companyContent = loadedCompany ? (
    <CompanyProfile company={loadedCompany} fetchCompany={getCompany} />
  ) : (
    <LoadingBar />
  );

  return (
    <div className={styles.CompanyProfileContainer}>
      <HeaderBanner imageSource={CompanyMeeting} />
      <div className={styles.ContentContainer}>
        {companyContent}
        <ExecutiveSearchBanner imageSource={ExecutiveSearchImage} />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getOneCompany: companyData => dispatch(actionCreators.getOneCompany(companyData)),
  };
};

export default connect(null, mapDispatchToProps)(CompanyProfilePage);
