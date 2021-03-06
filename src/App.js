import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import * as actionTypes from './store/actions/actions';
import * as actionCreators from './store/actions';

import HomePage from './general/pages/HomePage/HomePage';
import Blogs from './general/pages/Blogs/Blogs';
import AboutUs from './general/pages/AboutUs/AboutUs';
import SyaratKetentuan from './general/pages/SyaratKetentuan/SyaratKetentuan';
import KebijakanPrivasi from './general/pages/KebijakanPrivasi/KebijakanPrivasi';
import ForgotPwd from './general/components/RegistrationModal/ForgotPwd';
import ResetPwd from './general/components/RegistrationModal/ResetPwd';

import CompanyRegisForm from './general/pages/CompanyAuth/CompanyAuth';
import NavigationWrapper from './shared/Navigation/NavigationWrapper';
import Footer from './shared/Navigation/Footer';

import OrderModal from './shared/UI_Element/OrderModal';
import LoadingBar from './shared/UI_Element/Spinner/LoadingBar';

import './App.css';

//==================================== jobs =========================================================

const NewJob = React.lazy(() => import('./jobs/pages/NewJob/NewJob'));
const EditJob = React.lazy(() => import('./jobs/pages/EditJob/EditJob'));
const JobsDashboard = React.lazy(() => import('./jobs/pages/JobsDashboard/JobsDashboard'));
const EditUnreleasedJob = React.lazy(() => import('./jobs/pages/EditJob/EditUnreleasedJob'));
const PackageAds = React.lazy(() => import('./jobs/pages/PackageAds/PackageAds'));
const JobDetails = React.lazy(() => import('./jobs/pages/JobDetails/JobDetails'));
const AppliedCandidatesList = React.lazy(() => import('./jobs/pages/AppliedCandidatesList/AppliedCandidatesList'));

//==================================== company =========================================================

const CompanyProfileForm = React.lazy(() => import('./users/company/pages/CompanyProfileForm/CompanyProfileForm'));
const CompanyBriefDescriptions = React.lazy(() => import('./users/company/pages/CompanyProfilePage'));
const EditCompanyPIC = React.lazy(() => import('./users/company/components/EditPIC'));
const CompanyOrderForm = React.lazy(() => import('./users/company/pages/CompanyOrderForm/CompanyOrderForm'));
const OrderBCForm = React.lazy(() => import('./users/company/pages/OrderBCForm/OrderBCForm'));
const ExecutiveSearchForm = React.lazy(() => import('./users/company/pages/ExecutiveSearchForm'));
const CompanyOrderList = React.lazy(() => import('./users/company/pages/CompanyOrderList/CompanyOrderList'));
const RegistrationDetailsForm = React.lazy(() => import('./users/company/pages/RegistrationDetailsForm'));
const PICDetailsForm = React.lazy(() => import('./users/company/pages/PICDetails'));
const ExecutiveSearchDetail = React.lazy(() =>
  import('./users/company/pages/CompanyExecutiveSearch/ExecutiveSearchDetail')
);
const CompanyJobList = React.lazy(() => import('./users/company/pages/CompanyJobList'));

//==================================== applicant =========================================================

const JobsApplied = React.lazy(() => import('./users/applicant/pages/JobsApplied'));
const ApplicantDetails = React.lazy(() => import('./users/applicant/pages/ApplicantDetails'));
const ApplicantDetailsAO = React.lazy(() => import('./users/admin/pages/ApplicantDetailsAO/ApplicantDetailsAO'));
const Language = React.lazy(() => import('./users/applicant/components/Edit/Language'));

//==================================== admin =========================================================

const AdmAuth = React.lazy(() => import('./general/components/RegistrationModal/AdmAuth'));
const AdminProfile = React.lazy(() => import('./users/admin/pages/AdminProfile/AdminProfile'));
const JobsListAO = React.lazy(() => import('./users/admin/pages/JobsListAO/JobsListAO'));
const CompaniesListAO = React.lazy(() => import('./users/admin/pages/CompaniesListAO/CompaniesListAO'));
const ApplicantsListAO = React.lazy(() => import('./users/admin/pages/ApplicantsListAO/ApplicantsListAO'));
const JobsDetailsAO = React.lazy(() => import('./users/admin/pages/JobDetailsAO/JobDetailsAO'));
const CustomerSupportsAO = React.lazy(() => import('./users/admin/pages/CustomerSupportsAO/CustomerSupportsAO'));
const FinancialAO = React.lazy(() => import('./users/admin/pages/FinancialAO/FinancialAO'));
const Invoice = React.lazy(() => import('./users/admin/pages/FinancialAO/Invoice'));
const InvoiceBC = React.lazy(() => import('./users/admin/pages/FinancialAO/InvoiceBC'));
const OrderREG = React.lazy(() => import('./users/admin/pages/OrderREG/OrderREG'));
const OrderREGFinance = React.lazy(() => import('./users/admin/pages/OrderREG/OrderREGFinance'));
const OrderREGOperational = React.lazy(() => import('./users/admin/pages/OrderREG/OrderREGOperational'));
const OrderBC = React.lazy(() => import('./users/admin/pages/OrderBC/OrderBC'));
const OrderBCOperational = React.lazy(() => import('./users/admin/pages/OrderBC/OrderBCOperational'));
const OrderBCFinance = React.lazy(() => import('./users/admin/pages/OrderBC/OrderBCFinance'));
const OrderES = React.lazy(() => import('./users/admin/pages/OrderES/OrderES'));
const DetailBC = React.lazy(() => import('./users/admin/pages/OrderBC/DetailBC'));
const DetailES = React.lazy(() => import('./users/admin/pages/OrderES/DetailES'));
const Promo = React.lazy(() => import('./users/admin/pages/Promo/Promo'));
const SlotReg = React.lazy(() => import('./users/admin/pages/OrderREG/SlotReguler'));
const NotificationsAO = React.lazy(() => import('./users/admin/pages/NotificationsAO/NotificationsAO'));

let logoutTimer;

const App = (props) => {
  const { login, loginAdmin } = props;
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('userData'));
    if (authData && authData.token && !authData.isAdmin && new Date(authData.expiration) > new Date()) {
      login(authData);
    } else if (authData && authData.token && authData.isAdmin) {
      loginAdmin(authData);
    } else {
      localStorage.removeItem('userData');
    }
  }, [login, loginAdmin]);

  const adminToken = props.admin.token;
  const adminTokenExp = props.admin.tokenExpirationDate;
  const userToken = props.auth.token;
  const userTokenExp = props.auth.tokenExpirationDate;
  const { logout, logoutAdmin } = props;
  useEffect(() => {
    if (adminToken && adminTokenExp) {
      const remainingTime = new Date(adminTokenExp).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logoutAdmin, remainingTime);
    } else if (userToken && userTokenExp) {
      const remainingTime = new Date(userTokenExp).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [adminToken, adminTokenExp, userToken, userTokenExp, logout, logoutAdmin]);

  // ====================================NOTIFICATION=======================================

  const { admin, auth, getAdminNotifications, getCompanyNotifications } = props;

  useEffect(() => {
    if (admin.isAdmin) {
      const payload = {
        token: admin.token,
        adminId: admin.userId,
      };
      getAdminNotifications(payload).catch((err) => console.log(err));
    }

    if (auth.isCompany) {
      const payload = {
        token: auth.token,
        companyId: auth.userId,
      };
      getCompanyNotifications(payload).catch((err) => console.log(err));
    }
  }, [
    admin.isAdmin,
    admin.token,
    admin.userId,
    getAdminNotifications,
    auth.isCompany,
    auth.token,
    auth.userId,
    getCompanyNotifications,
  ]);

  return (
    <Router>
      <NavigationWrapper />
      <main>
        <Suspense
          fallback={
            <div className='centerGlobal'>
              <LoadingBar />
            </div>
          }>
          <Switch>
            {/* Users Routes: Applicant */}
            <Route path='/test/modal' component={OrderModal} />

            {/* <Route path='/ap/:applicantid/intro' component={EditApplicantBriefInformations} /> */}

            <Route path='/ap/:applicantid/language' component={Language} />
            <Route path='/ap/:applicantid/appliedjobs' component={JobsApplied} />
            <Route path='/ap/:applicantid/profile' component={ApplicantDetails} />

            {/* Users Routes: Company */}
            <Route path='/co/:companyid/compro/personincharge' component={EditCompanyPIC} />
            <Route path='/co/order/es' component={ExecutiveSearchForm} />
            <Route path='/co/order/:orderid/es' component={ExecutiveSearchDetail} />
            <Route path='/co/order/reguler' component={CompanyOrderForm} />
            <Route path='/co/order/candidate' component={OrderBCForm} />
            <Route path='/co/notifications' component={NotificationsAO} />
            <Route path='/co/:companyid/registration-details' component={RegistrationDetailsForm} />
            <Route path='/co/:companyid/pic-details' component={PICDetailsForm} />
            <Route path='/co/:companyid/listOrder' component={CompanyOrderList} />
            <Route path='/co/:companyid/jobList' component={CompanyJobList} />
            <Route path='/co/:orderid/invoice' component={Invoice} />
            <Route path='/co/:orderid/invoiceBC' component={InvoiceBC} />
            <Route path='/co/:companyid/compro' component={CompanyProfileForm} />
            <Route path='/co/:companyid/profile' component={CompanyBriefDescriptions} />
            <Route path='/authentication/co' component={CompanyRegisForm} />

            {/* Jobs Routes */}
            <Route path='/jobs-dashboard' component={JobsDashboard} />
            <Route path='/jobs/new/edit/:jobsid' component={EditUnreleasedJob} />
            <Route path='/jobs/new' component={NewJob} />
            <Route path='/jobs/packageads' component={PackageAds} />
            <Route path='/jobs/:jobsid/edit' component={EditJob} />
            <Route path='/jobs/appliedCandidatesList/:jobsid' component={AppliedCandidatesList} />
            <Route path='/jobs/:jobsid' component={JobDetails} />

            {/* Admin Routes */}
            <Route path='/ad/alphaomega/slot/reguler' component={SlotReg} />
            <Route path='/ad/alphaomega/admreg' component={AdmAuth} />

            <Route path='/ad/alphaomega/profile' component={AdminProfile} />
            <Route path='/ad/alphaomega/applicants/:applicantid' component={ApplicantDetailsAO} />
            <Route path='/ad/alphaomega/applicants' component={ApplicantsListAO} />
            <Route path='/ad/alphaomega/jobs/:jobid' component={JobsDetailsAO} />
            <Route path='/ad/alphaomega/jobs' component={JobsListAO} />
            <Route path='/ad/alphaomega/companies' component={CompaniesListAO} />
            <Route path='/ad/alphaomega/customer-supports' component={CustomerSupportsAO} />
            <Route path='/ad/alphaomega/financial' component={FinancialAO} />
            <Route path='/ad/alphaomega/order/reguler/all' component={OrderREG} />
            <Route path='/ad/alphaomega/order/reguler/fin' component={OrderREGFinance} />
            <Route path='/ad/alphaomega/order/reguler/opr' component={OrderREGOperational} />
            <Route path='/ad/alphaomega/order/candidate/all' component={OrderBC} />
            <Route path='/ad/alphaomega/order/candidate/fin' component={OrderBCFinance} />
            <Route path='/ad/alphaomega/order/candidate/opr' component={OrderBCOperational} />
            <Route path='/ad/alphaomega/order/es' component={OrderES} />
            <Route path='/ad/alphaomega/order/:orderid/candidate' component={DetailBC} />
            <Route path='/ad/alphaomega/order/:orderid/es' component={DetailES} />
            <Route path='/ad/alphaomega/promo' component={Promo} />
            <Route path='/ad/alphaomega/notifications' component={NotificationsAO} />

            {/* General Routes */}
            <Route path='/blogs' component={Blogs} />
            <Route path='/about-us' component={AboutUs} />
            <Route path='/syarat-ketentuan' component={SyaratKetentuan} />
            <Route path='/kebijakan-privasi' component={KebijakanPrivasi} />
            <Route path='/forgot' component={ForgotPwd} />
            <Route path='/reset/:token' component={ResetPwd} />
            <Route path='/' component={HomePage} />

            {/* Absurd Routes */}
            <Redirect to='/' />
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    admin: state.admin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload) => dispatch({ type: actionTypes.AUTHLOGIN, payload }),
    loginAdmin: (payload) => dispatch({ type: actionTypes.AUTHADMINFINISH, payload }),
    logout: () => dispatch({ type: actionTypes.AUTHLOGOUT }),
    logoutAdmin: () => dispatch({ type: actionTypes.ADMINLOGOUT }),
    getAdminNotifications: (payload) => dispatch(actionCreators.getAdminNotifications(payload)),
    getCompanyNotifications: (payload) => dispatch(actionCreators.getCompanyNotifications(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
