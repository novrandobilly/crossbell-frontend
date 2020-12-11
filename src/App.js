
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import * as actionTypes from './store/actions/actions';

import EditCompanyIntro from './users/company/pages/Components/EditIntro';
import EditCompanyBriefDescriptions from './users/company/pages/Components/EditCompanyBriefDescriptions';
import EditCompanyPIC from './users/company/pages/Components/EditPIC';

import CompanyOrderForm from './users/company/pages/CompanyOrderForm/CompanyOrderForm';
  import OrderBCForm from "./users/company/pages/OrderBCForm/OrderBCForm";
import CompanyOrderList from './users/company/pages/CompanyOrderList/CompanyOrderList';
import CompanyExecutiveSearch from './users/company/pages/CompanyExecutiveSearch/CompanyExecutiveSearch';

import NewJob from './jobs/pages/NewJob';
import EditJob from './jobs/pages/EditJob';
import JobsDashboard from './jobs/pages/JobsDashboard';
import Home from './general/pages/Home/Home';
import Blogs from './general/pages/Blogs/Blogs';
import AboutUs from './general/pages/AboutUs/AboutUs';
import ContactUs from './general/pages/ContactUs/ContactUs';
import SyaratKetentuan from './general/pages/SyaratKetentuan/SyaratKetentuan';
import KebijakanPrivasi from './general/pages/KebijakanPrivasi/KebijakanPrivasi';
import CompanyProfileForm from './users/company/pages/CompanyProfileForm/CompanyProfileForm';

import PackageAds from './jobs/pages/PackageAds';
import CompanyBriefDescriptions from './users/company/pages/CompanyBriefDescriptions/CompanyBriefDescriptions';
import JobDetails from './jobs/pages/JobDetails';

import ApplicantResumeVal from './users/applicant/pages/ApplicantResumeVal/ApplicantResumeVal';
import ApplicantDetails from './users/applicant/pages/ApplicantDetails/ApplicantDetails';
import ApplicantDetailsAO from './users/admin/pages/ApplicantDetailsAO/ApplicantDetailsAO';

import EditApplicantIntro from './users/applicant/pages/Components/Edit/EditIntro';
import EditApplicantSummary from './users/applicant/pages/Components/Edit/EditSummary';
import EditApplicantEducation from './users/applicant/pages/Components/Edit/Education';
import EditApplicantExperience from './users/applicant/pages/Components/Edit/Experience';
import EditApplicantCertification from './users/applicant/pages/Components/Edit/Certification';
import EditApplicantSkills from './users/applicant/pages/Components/Edit/Skill';

import AddApplicantIntro from './users/applicant/pages/Components/Add/EditIntro';
import AddApplicantSummary from './users/applicant/pages/Components/Add/EditSummary';
import AddApplicantEducation from './users/applicant/pages/Components/Add/Education';
import AddApplicantExperience from './users/applicant/pages/Components/Add/Experience';
import AddApplicantCertification from './users/applicant/pages/Components/Add/Certification';
import AddApplicantSkills from './users/applicant/pages/Components/Add/Skill';

import AdmAuth from './general/pages/Home/Components/AdmAuth';
import AdminProfile from './users/admin/pages/AdminProfile/AdminProfile';
import JobsListAO from './users/admin/pages/JobsListAO/JobsListAO';
import CompaniesListAO from './users/admin/pages/CompaniesListAO/CompaniesListAO';
import ApplicantsListAO from './users/admin/pages/ApplicantsListAO/ApplicantsListAO';
import JobsDetailsAO from './users/admin/pages/JobDetailsAO/JobDetailsAO';
import CustomerSupportsAO from './users/admin/pages/CustomerSupportsAO/CustomerSupportsAO';
import FinancialAO from './users/admin/pages/FinancialAO/FinancialAO';
import Invoice from './users/admin/pages/FinancialAO/Invoice';
import OrderREG from './users/admin/pages/OrderReguler/OrderREG';
import OrderBC from './users/admin/pages/OrderBC/OrderBC';
import OrderHeadhunter from './users/admin/pages/OrderHeadhunter/OrderHeadhunter';

import AuthenticationAp from './users/applicant/pages/AuthenticationAp/AuthenticationAp';
import AuthenticationCo from './users/company/pages/AuthenticationCo/AuthenticationCo';
import MainNavigation from './shared/Navigation/MainNavigation';
import Footer from './shared/Navigation/Footer';

import './App.css';

let logoutTimer;

const App = props => {
	const { login, loginAdmin } = props;
	useEffect(
		() => {
			const authData = JSON.parse(localStorage.getItem('userData'));
			if (authData && authData.token && !authData.isAdmin && new Date(authData.expiration) > new Date()) {
				login(authData);
				console.log(authData);
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
				<Switch>
					{/* Users Routes: Applicant */}
					<Route path='/ap/:applicantid/res-val' component={ApplicantResumeVal} />

					<Route path='/ap/:applicantid/add/intro' component={AddApplicantIntro} />

					<Route path='/ap/:applicantid/add/summary' component={AddApplicantSummary} />
					<Route path='/ap/:applicantid/add/education' component={AddApplicantEducation} />
					<Route path='/ap/:applicantid/add/experience' component={AddApplicantExperience} />
					<Route path='/ap/:applicantid/add/certification' component={AddApplicantCertification} />
					<Route path='/ap/:applicantid/add/skills' component={AddApplicantSkills} />

					<Route path='/ap/:applicantid/intro' component={EditApplicantIntro} />
					<Route path='/ap/:applicantid/summary' component={EditApplicantSummary} />
					<Route path='/ap/:applicantid/education/:educationindex' component={EditApplicantEducation} />
					<Route path='/ap/:applicantid/experience/:experienceindex' component={EditApplicantExperience} />
					<Route path='/ap/:applicantid/certification/:certificationindex' component={EditApplicantCertification} />
					<Route path='/ap/:applicantid/skills' component={EditApplicantSkills} />
					<Route path='/ap/:applicantid' component={ApplicantDetails} />

					<Route path='/authentication/ap' component={AuthenticationAp} />

					{/* Users Routes: Company */}
					<Route path='/co/:companyid/compro/intro' component={EditCompanyIntro} />
					<Route path='/co/:companyid/compro/details' component={EditCompanyBriefDescriptions} />
					<Route path='/co/:companyid/compro/mission' component={EditCompanyPIC} />
					<Route path='/co/order/es' component={CompanyExecutiveSearch} />

					<Route path='/co/order/reguler' component={CompanyOrderForm} />
    <Route path="/co/order/candidate" component={OrderBCForm} />
					<Route path='/co/:companyid/listOrder' component={CompanyOrderList} />
					<Route path='/co/:orderid/invoice' component={Invoice} />
					<Route path='/co/:companyid/compro' component={CompanyProfileForm} />
					<Route path='/co/:companyid' component={CompanyBriefDescriptions} />
					<Route path='/authentication/co' component={AuthenticationCo} />

					{/* Jobs Routes */}
					<Route path='/jobs-dashboard' component={JobsDashboard} />
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
    
					<Route path='/ad/alphaomega/order/headhunter' component={OrderHeadhunter} />

					{/* General Routes */}
					<Route path='/blogs' component={Blogs} />
					<Route path='/about-us' component={AboutUs} />
					<Route path='/contact-us' component={ContactUs} />
					<Route path='/syarat-ketentuan' component={SyaratKetentuan} />
					<Route path='/kebijakan-privasi' component={KebijakanPrivasi} />
					<Route path='/' component={Home} />

					{/* Absurd Routes */}
					<Redirect to='/' />
				</Switch>
			</main>
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
