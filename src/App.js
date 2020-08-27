import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import JobsDashboard from './jobs/pages/JobsDashboard/JobsDashboard';
import Home from './general/pages/Home/Home';
import Blogs from './general/pages/Blogs/Blogs';
import AboutUs from './general/pages/AboutUs/AboutUs';
import ContactUs from './general/pages/ContactUs/ContactUs';
import CompanyProfileForm from './users/company/pages/CompanyProfileForm/CompanyProfileForm';
import NewJob from './jobs/pages/NewJob/NewJob';
import PackageAds from './jobs/pages/PackageAds/PackageAds';
import CompanyDetails from './users/company/pages/CompanyDetails/CompanyDetails';
import JobDetails from './jobs/pages/JobDetails/JobDetails';
import ApplicantResumeVal from './users/applicant/pages/ApplicantResumeVal/ApplicantResumeVal';
import ApplicantDetails from './users/applicant/pages/ApplicantDetails/ApplicantDetails';
import JobsListAO from './jobs/pages/JobsListAO/JobsListAO';
import ApplicantDetailsAO from './users/admin/pages/ApplicantDetailsAO/ApplicantDetailsAO';
import CompaniesListAO from './users/admin/pages/CompaniesListAO/CompaniesListAO';
import ApplicantsListAO from './users/admin/pages/ApplicantsListAO/ApplicantsListAO';
import JobsDetailsAO from './users/admin/pages/JobDetailsAO/JobDetailsAO';
import CustomerSupportsAO from './users/admin/pages/CustomerSupportsAO/CustomerSupportsAO';
import AuthenticationAp from './users/applicant/pages/AuthenticationAp/AuthenticationAp';
import AuthenticationCo from './users/company/pages/AuthenticationCo/AuthenticationCo';

const App = () => {
	return (
		<Router>
			<Switch>
				{/* Users Routes: Applicant */}
				<Route path='/ap/:applicantid/res-val' component={ApplicantResumeVal} />
				<Route path='/ap/:applicantid' component={ApplicantDetails} />
				<Route path='/authentication/ap' component={AuthenticationAp} />

				{/* Users Routes: Company */}
				<Route path='/co/:companyid/compro' component={CompanyProfileForm} />
				<Route path='/co/:companyid' component={CompanyDetails} />
				<Route path='/authentication/co' component={AuthenticationCo} />

				{/* Jobs Routes */}
				<Route path='/jobs-dashboard' component={JobsDashboard} />
				<Route path='/jobs/new' component={NewJob} />
				<Route path='/jobs/packageads' component={PackageAds} />
				<Route path='/jobs/:jobsid' component={JobDetails} />

				{/* Admin Routes */}
				<Route path='/ad/alphaomega/applicants/:applicantid' component={ApplicantDetailsAO} />
				<Route path='/ad/alphaomega/applicants' component={ApplicantsListAO} />
				<Route path='/ad/alphaomega/jobs/:jobid' component={JobsDetailsAO} />
				<Route path='/ad/alphaomega/jobs' component={JobsListAO} />
				<Route path='/ad/alphaomega/companies' component={CompaniesListAO} />
				<Route path='/ad/alphaomega/customer-supports' component={CustomerSupportsAO} />

				{/* General Routes */}
				<Route path='/blogs' component={Blogs} />
				<Route path='/about-us' component={AboutUs} />
				<Route path='/contact-us' component={ContactUs} />
				<Route path='/' component={Home} />

				{/* Absurd Routes */}
				<Redirect to='/' />
			</Switch>
		</Router>
	);
};

export default App;
