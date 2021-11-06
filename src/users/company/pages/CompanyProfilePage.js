import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';

import HeaderBanner from '../../../shared/UI_Element/HeaderBanner';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import MeetingDashboard from '../../../assets/images/Meeting-Dashboard.png';
import CompanyMeeting from '../../../assets/images/CompanyMeeting.png';
import CompanyMap from '../components/CompanyMap';
import CompanyProfile from '../components/CompanyProfile';
import styles from './CompanyProfilePage.module.scss';

const CompanyProfilePage = props => {
  const { companyid } = useParams();
  const [loadedCompany, setLoadedCompany] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOneCompany } = props;
  useEffect(() => {
    const getCompany = async () => {
      try {
        let res = await getOneCompany({ userId: companyid });
        setLoadedCompany(res.company);
      } catch (err) {
        console.log(err);
      }
    };
    getCompany();
  }, [companyid, getOneCompany]);

  // let companyContent = loadedCompany ? <CompanyProfile company={loadedCompany} /> : <LoadingBar />;
  let companyContent = loadedCompany ? <CompanyProfile company={loadedCompany} /> : <LoadingBar />;

  return (
    <div className={styles.CompanyProfileContainer}>
      <HeaderBanner imageSource={CompanyMeeting} />
      {companyContent}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getOneCompany: companyData => dispatch(actionCreators.getOneCompany(companyData)),
  };
};

export default connect(null, mapDispatchToProps)(CompanyProfilePage);
