import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import * as actionTypes from './store/actions/actions';

import Home from './general/pages/Home/Home';
import Blogs from './general/pages/Blogs/Blogs';
import AboutUs from './general/pages/AboutUs/AboutUs';
import ContactUs from './general/pages/ContactUs/ContactUs';
import SyaratKetentuan from './general/pages/SyaratKetentuan/SyaratKetentuan';
import KebijakanPrivasi from './general/pages/KebijakanPrivasi/KebijakanPrivasi';
import ForgotPwd from './general/pages/Home/Components/ForgotPwd';
import ResetPwd from './general/pages/Home/Components/ResetPwd';
import FAQ from './general/components/ContactUs/FAQ';

import AuthenticationAp from './users/applicant/pages/AuthenticationAp/AuthenticationAp';
import AuthenticationCo from './users/company/pages/AuthenticationCo/AuthenticationCo';
import MainNavigation from './shared/Navigation/MainNavigation';
import Footer from './shared/Navigation/Footer';
import ContactIcon from './shared/UI_Element/ContactIcon';

import OrderModal from './shared/UI_Element/OrderModal';
import Spinner from './shared/UI_Element/Spinner/SpinnerCircle';

import './App.css';

//==================================== jobs =========================================================

// import NewJob from './jobs/pages/NewJob';
// import EditJob from './jobs/pages/EditJob';
// import JobsDashboard from './jobs/pages/JobsDashboard';
// import EditUnreleasedJob from './jobs/pages/EditUnreleasedJob';
// import PackageAds from './jobs/pages/PackageAds';
// import JobDetails from './jobs/pages/JobDetails';

const NewJob = React.lazy(() => import('./jobs/pages/NewJob'));
const EditJob = React.lazy(() => import('./jobs/pages/EditJob'));
const JobsDashboard = React.lazy(() => import('./jobs/pages/JobsDashboard'));
const EditUnreleasedJob = React.lazy(() => import('./jobs/pages/EditUnreleasedJob'));
const PackageAds = React.lazy(() => import('./jobs/pages/PackageAds'));
const JobDetails = React.lazy(() => import('./jobs/pages/JobDetails'));

//==================================== company =========================================================
// import CompanyProfileForm from './users/company/pages/CompanyProfileForm/CompanyProfileForm';
// import EditCompanyIntro from './users/company/pages/Components/EditIntro';
// import CompanyBriefDescriptions from './users/company/pages/CompanyBriefDescriptions/CompanyBriefDescriptions';
// import EditCompanyBriefDescriptions from './users/company/pages/Components/EditCompanyBriefDescriptions';
// import EditCompanyPIC from './users/company/pages/Components/EditPIC';

const CompanyProfileForm = React.lazy(() => import('./users/company/pages/CompanyProfileForm/CompanyProfileForm'));
const EditCompanyIntro = React.lazy(() => import('./users/company/pages/Components/EditIntro'));
const CompanyBriefDescriptions = React.lazy(() => import('./users/company/pages/CompanyBriefDescriptions/CompanyBriefDescriptions'));
const EditCompanyBriefDescriptions = React.lazy(() => import('./users/company/pages/Components/EditCompanyBriefDescriptions'));
const EditCompanyPIC = React.lazy(() => import('./users/company/pages/Components/EditPIC'));

// import CompanyOrderForm from './users/company/pages/CompanyOrderForm/CompanyOrderForm';
// import OrderBCForm from './users/company/pages/OrderBCForm/OrderBCForm';
// import CompanyExecutiveSearch from './users/company/pages/CompanyExecutiveSearch/CompanyExecutiveSearch';
// import CompanyOrderList from './users/company/pages/CompanyOrderList/CompanyOrderList';
// import ExecutiveSearchDetail from './users/company/pages/CompanyExecutiveSearch/ExecutiveSearchDetail';
// import CompanyJobList from './users/company/pages/CompanyJobList/CompanyJobList';

const CompanyOrderForm = React.lazy(() => import('./users/company/pages/CompanyOrderForm/CompanyOrderForm'));
const OrderBCForm = React.lazy(() => import('./users/company/pages/OrderBCForm/OrderBCForm'));
const CompanyExecutiveSearch = React.lazy(() => import('./users/company/pages/CompanyExecutiveSearch/CompanyExecutiveSearch'));
const CompanyOrderList = React.lazy(() => import('./users/company/pages/CompanyOrderList/CompanyOrderList'));
const ExecutiveSearchDetail = React.lazy(() => import('./users/company/pages/CompanyExecutiveSearch/ExecutiveSearchDetail'));
const CompanyJobList = React.lazy(() => import('./users/company/pages/CompanyJobList/CompanyJobList'));

//==================================== applicant =========================================================

// import ApplicantResumeVal from './users/applicant/pages/ApplicantResumeVal/ApplicantResumeVal';
// import ApplicantDetails from './users/applicant/pages/ApplicantDetails/ApplicantDetails';
// import ApplicantDetailsAO from './users/admin/pages/ApplicantDetailsAO/ApplicantDetailsAO';
// import Subscription from './users/applicant/pages/Components/Subscription';

const ApplicantResumeVal = React.lazy(() => import('./users/applicant/pages/ApplicantResumeVal/ApplicantResumeVal'));
const ApplicantDetails = React.lazy(() => import('./users/applicant/pages/ApplicantDetails/ApplicantDetails'));
const ApplicantDetailsAO = React.lazy(() => import('./users/admin/pages/ApplicantDetailsAO/ApplicantDetailsAO'));
const Subscription = React.lazy(() => import('./users/applicant/pages/Components/Subscription'));

// import EditApplicantIntro from './users/applicant/pages/Components/Edit/EditIntro';
// import EditApplicantSummary from './users/applicant/pages/Components/Edit/EditSummary';
// import EditApplicantEducation from './users/applicant/pages/Components/Edit/Education';
// import EditApplicantExperience from './users/applicant/pages/Components/Edit/Experience';
// import EditApplicantCertification from './users/applicant/pages/Components/Edit/Certification';
// import EditApplicantSkills from './users/applicant/pages/Components/Edit/Skill';
// import AddApplicantEducation from './users/applicant/pages/Components/Add/Education';
// import AddApplicantExperience from './users/applicant/pages/Components/Add/Experience';
// import AddApplicantCertification from './users/applicant/pages/Components/Add/Certification';
// import AddApplicantSkills from './users/applicant/pages/Components/Add/Skill';

const EditApplicantIntro = React.lazy(() => import('./users/applicant/pages/Components/Edit/EditIntro'));
const EditApplicantSummary = React.lazy(() => import('./users/applicant/pages/Components/Edit/EditSummary'));
const EditApplicantEducation = React.lazy(() => import('./users/applicant/pages/Components/Edit/Education'));
const EditApplicantExperience = React.lazy(() => import('./users/applicant/pages/Components/Edit/Experience'));
const EditApplicantCertification = React.lazy(() => import('./users/applicant/pages/Components/Edit/Certification'));
const EditApplicantSkills = React.lazy(() => import('./users/applicant/pages/Components/Edit/Skill'));
const AddApplicantEducation = React.lazy(() => import('./users/applicant/pages/Components/Add/Education'));
const AddApplicantExperience = React.lazy(() => import('./users/applicant/pages/Components/Add/Experience'));
const AddApplicantCertification = React.lazy(() => import('./users/applicant/pages/Components/Add/Certification'));
// const AddApplicantSkills = React.lazy(() => import('./users/applicant/pages/Components/Add/Skill'));

//==================================== admin =========================================================

// import AdmAuth from './general/pages/Home/Components/AdmAuth';
// import AdminProfile from './users/admin/pages/AdminProfile/AdminProfile';
// import JobsListAO from './users/admin/pages/JobsListAO/JobsListAO';
// import CompaniesListAO from './users/admin/pages/CompaniesListAO/CompaniesListAO';
// import ApplicantsListAO from './users/admin/pages/ApplicantsListAO/ApplicantsListAO';
// import JobsDetailsAO from './users/admin/pages/JobDetailsAO/JobDetailsAO';
// import CustomerSupportsAO from './users/admin/pages/CustomerSupportsAO/CustomerSupportsAO';
// import FinancialAO from './users/admin/pages/FinancialAO/FinancialAO';
// import Invoice from './users/admin/pages/FinancialAO/Invoice';
// import OrderREG from './users/admin/pages/OrderREG/OrderREG';
// import OrderBC from './users/admin/pages/OrderBC/OrderBC';
// import OrderES from './users/admin/pages/OrderES/OrderES';
// import DetailBC from './users/admin/pages/OrderBC/DetailBC';
// import DetailES from './users/admin/pages/OrderES/DetailES';
// import Promo from './users/admin/pages/Promo/Promo';

const AdmAuth = React.lazy(() => import('./general/pages/Home/Components/AdmAuth'));
const AdminProfile = React.lazy(() => import('./users/admin/pages/AdminProfile/AdminProfile'));
const JobsListAO = React.lazy(() => import('./users/admin/pages/JobsListAO/JobsListAO'));
const CompaniesListAO = React.lazy(() => import('./users/admin/pages/CompaniesListAO/CompaniesListAO'));
const ApplicantsListAO = React.lazy(() => import('./users/admin/pages/ApplicantsListAO/ApplicantsListAO'));
const JobsDetailsAO = React.lazy(() => import('./users/admin/pages/JobDetailsAO/JobDetailsAO'));
const CustomerSupportsAO = React.lazy(() => import('./users/admin/pages/CustomerSupportsAO/CustomerSupportsAO'));
const FinancialAO = React.lazy(() => import('./users/admin/pages/FinancialAO/FinancialAO'));
const Invoice = React.lazy(() => import('./users/admin/pages/FinancialAO/Invoice'));
const OrderREG = React.lazy(() => import('./users/admin/pages/OrderREG/OrderREG'));
const OrderBC = React.lazy(() => import('./users/admin/pages/OrderBC/OrderBC'));
const OrderES = React.lazy(() => import('./users/admin/pages/OrderES/OrderES'));
const DetailBC = React.lazy(() => import('./users/admin/pages/OrderBC/DetailBC'));
const DetailES = React.lazy(() => import('./users/admin/pages/OrderES/DetailES'));
const Promo = React.lazy(() => import('./users/admin/pages/Promo/Promo'));

let logoutTimer;

const App = props => {
	const { login, loginAdmin } = props;
	useEffect(
		() => {
			const authData = JSON.parse(localStorage.getItem('userData'));
			if (authData && authData.token && !authData.isAdmin && new Date(authData.expiration) > new Date()) {
				login(authData);
			} else if (authData && authData.token && authData.isAdmin) {
				loginAdmin(authData);
			} else {
				localStorage.removeItem('userData');
			}
		},
		[ login, loginAdmin ]
	);

	const adminToken = props.admin.token;
	const adminTokenExp = props.admin.tokenExpirationDate;
	const userToken = props.auth.token;
	const userTokenExp = props.auth.tokenExpirationDate;
	const { logout, logoutAdmin } = props;
	useEffect(
		() => {
			if (adminToken && adminTokenExp) {
				const remainingTime = new Date(adminTokenExp).getTime() - new Date().getTime();
				logoutTimer = setTimeout(logoutAdmin, remainingTime);
			} else if (userToken && userTokenExp) {
				const remainingTime = new Date(userTokenExp).getTime() - new Date().getTime();
				logoutTimer = setTimeout(logout, remainingTime);
			} else {
				clearTimeout(logoutTimer);
			}
		},
		[ adminToken, adminTokenExp, userToken, userTokenExp, logout, logoutAdmin ]
	);

	return (
		<Router>
			<MainNavigation />
			<main>
				<Suspense
					fallback={
						<div className='centerGlobal'>
							<Spinner />
						</div>
					}>
					<Switch>
						{/* Users Routes: Applicant */}
						<Route path='/test/modal' component={OrderModal} />
						<Route path='/ap/:applicantid/res-val' component={ApplicantResumeVal} />
						<Route path='/ap/:applicantid/add/education' component={AddApplicantEducation} />
						<Route path='/ap/:applicantid/add/experience' component={AddApplicantExperience} />
						<Route path='/ap/:applicantid/add/certification' component={AddApplicantCertification} />
						{/* <Route path='/ap/:applicantid/add/skills' component={AddApplicantSkills} /> */}

						<Route path='/ap/:applicantid/intro' component={EditApplicantIntro} />
						<Route path='/ap/:applicantid/summary' component={EditApplicantSummary} />
						<Route path='/ap/:applicantid/education/:educationindex' component={EditApplicantEducation} />
						<Route path='/ap/:applicantid/experience/:experienceindex' component={EditApplicantExperience} />
						<Route path='/ap/:applicantid/certification/:certificationindex' component={EditApplicantCertification} />
						<Route path='/ap/:applicantid/skills' component={EditApplicantSkills} />
						<Route path='/ap/:applicantid' component={ApplicantDetails} />

						<Route path='/subscription/:applicantid' component={Subscription} />

						<Route path='/authentication/ap' component={AuthenticationAp} />

						{/* Users Routes: Company */}
						<Route path='/co/:companyid/compro/intro' component={EditCompanyIntro} />
						<Route path='/co/:companyid/compro/details' component={EditCompanyBriefDescriptions} />
						<Route path='/co/:companyid/compro/personincharge' component={EditCompanyPIC} />
						<Route path='/co/order/es' component={CompanyExecutiveSearch} />
						<Route path='/co/order/:orderid/es' component={ExecutiveSearchDetail} />
						<Route path='/co/order/reguler' component={CompanyOrderForm} />
						<Route path='/co/order/candidate' component={OrderBCForm} />
						<Route path='/co/:companyid/listOrder' component={CompanyOrderList} />
						<Route path='/co/:companyid/jobList' component={CompanyJobList} />
						<Route path='/co/:orderid/invoice' component={Invoice} />
						<Route path='/co/:companyid/compro' component={CompanyProfileForm} />
						<Route path='/co/:companyid' component={CompanyBriefDescriptions} />
						<Route path='/authentication/co' component={AuthenticationCo} />

						{/* Jobs Routes */}
						<Route path='/jobs-dashboard' component={JobsDashboard} />
						<Route path='/jobs/new/edit/:jobsid' component={EditUnreleasedJob} />
						<Route path='/jobs/new' component={NewJob} />
						<Route path='/jobs/packageads' component={PackageAds} />
						<Route path='/jobs/:jobsid/edit' component={EditJob} />
						<Route path='/jobs/:jobsid' component={JobDetails} />

						{/* Admin Routes */}
						<Route path='/ad/alphaomega/admreg' component={AdmAuth} />
						<Route path='/ad/alphaomega/profile' component={AdminProfile} />
						<Route path='/ad/alphaomega/applicants/:applicantid' component={ApplicantDetailsAO} />
						<Route path='/ad/alphaomega/applicants' component={ApplicantsListAO} />
						<Route path='/ad/alphaomega/jobs/:jobid' component={JobsDetailsAO} />
						<Route path='/ad/alphaomega/jobs' component={JobsListAO} />
						<Route path='/ad/alphaomega/companies' component={CompaniesListAO} />
						<Route path='/ad/alphaomega/customer-supports' component={CustomerSupportsAO} />
						<Route path='/ad/alphaomega/financial' component={FinancialAO} />
						<Route path='/ad/alphaomega/order/reguler' component={OrderREG} />
						<Route path='/ad/alphaomega/order/candidate' component={OrderBC} />
						<Route path='/ad/alphaomega/order/es' component={OrderES} />
						<Route path='/ad/alphaomega/order/:orderid/candidate' component={DetailBC} />
						<Route path='/ad/alphaomega/order/:orderid/es' component={DetailES} />
						<Route path='/ad/alphaomega/promo' component={Promo} />

						{/* General Routes */}
						<Route path='/FrequentlyAskedQuestion/:faqId' component={FAQ} />
						<Route path='/blogs' component={Blogs} />
						<Route path='/about-us' component={AboutUs} />
						<Route path='/contact-us' component={ContactUs} />
						<Route path='/syarat-ketentuan' component={SyaratKetentuan} />
						<Route path='/kebijakan-privasi' component={KebijakanPrivasi} />
						<Route path='/forgot' component={ForgotPwd} />
						<Route path='/reset/:token' component={ResetPwd} />
						<Route path='/' component={Home} />

						{/* Absurd Routes */}
						<Redirect to='/' />
					</Switch>
				</Suspense>
			</main>
			<ContactIcon />
			<Footer />
		</Router>
	);
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		admin: state.admin
	};
};

const mapDispatchToProps = dispatch => {
	return {
		login: payload => dispatch({ type: actionTypes.AUTHLOGIN, payload }),
		loginAdmin: payload => dispatch({ type: actionTypes.AUTHADMINFINISH, payload }),
		logout: () => dispatch({ type: actionTypes.AUTHLOGOUT }),
		logoutAdmin: () => dispatch({ type: actionTypes.ADMINLOGOUT })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
