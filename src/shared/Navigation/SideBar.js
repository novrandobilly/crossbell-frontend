import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import DescriptionIcon from '@material-ui/icons/Description';
import FeedbackIcon from '@material-ui/icons/Feedback';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import WorkIcon from '@material-ui/icons/Work';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
// import ListIcon from "@material-ui/icons/List";
import classes from './SideBar.module.css';

const SideBar = props => {
	const [ sideBar, setSideBar ] = useState(false);

	const toggleSideBar = () => {
		setSideBar(!sideBar);
	};

	let content = (
		<nav className={sideBar ? classes.ContainerActive : classes.Container}>
			<ul className={classes.MenuItem}>
				<li>
					<Link to={'/ad/alphaomega/profile'}>
						<span>Profile</span>
					</Link>
					<PersonIcon style={{ margin: '0.4rem 0rem -0.4rem 1rem', color: 'black' }} />
				</li>

				<li>
					<Link to={'/ad/alphaomega/companies'}>
						<span>Company List</span>
						<BusinessIcon
							style={{
								margin: '0.4rem 0rem -0.4rem 1rem',
								color: 'black'
							}}
						/>
					</Link>
				</li>
				<li>
					<Link to={'/ad/alphaomega/applicants'}>
						<span>Applicant List </span>
						<GroupIcon
							style={{
								margin: '0.4rem 0rem -0.4rem 1rem',
								color: 'black'
							}}
						/>
					</Link>
				</li>
				<li>
					<Link to={'/ad/alphaomega/jobs'}>
						<span>Job List</span>
						<WorkIcon
							style={{
								margin: '0.4rem 0rem -0.4rem 1rem',
								color: 'black'
							}}
						/>
					</Link>
				</li>
				<li>
					<Link to={'/ad/alphaomega/financial'}>
						<span>Finance</span>
						<AttachMoneyIcon
							style={{
								margin: '0.4rem 0rem -0.4rem 1rem',
								color: 'black'
							}}
						/>
					</Link>
				</li>
				<li>
					<Link to={'/ad/alphaomega/customer-supports'}>
						<span>Feedback List</span>
						<FeedbackIcon
							style={{
								margin: '0.4rem 0rem -0.4rem 1rem',
								color: 'black'
							}}
						/>
					</Link>
				</li>
				<li>
					<Link to={'/ad/alphaomega/order/reguler'}>
						<span>Order Reguler</span>
						<LocalOfferIcon
							style={{
								margin: '0.4rem 0rem -0.4rem 1rem',
								color: 'black'
							}}
						/>
					</Link>
				</li>
				<li>
					<Link to={'/ad/alphaomega/order/candidate'}>
						<span>Order Bulk Candidate</span>
						<AssignmentIndIcon
							style={{
								margin: '0.4rem 0rem -0.4rem 1rem',
								color: 'black'
							}}
						/>
					</Link>
				</li>
				<li>
					<Link to={'/ad/alphaomega/order/es'}>
						<span>Order Headhunter</span>
						<DescriptionIcon
							style={{
								margin: '0.4rem 0rem -0.4rem 1rem',
								color: 'black'
							}}
						/>
					</Link>
				</li>
			</ul>
		</nav>
	);

	return (
		<React.Fragment>
			<div className={classes.Burger}>
				{!sideBar ? (
					<MenuIcon onClick={toggleSideBar} style={{ fontSize: 40, cursor: 'pointer' }} />
				) : (
					<CloseIcon onClick={toggleSideBar} style={{ fontSize: 40, cursor: 'pointer' }} />
				)}
			</div>
			{content}
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		admin: state.admin
	};
};

export default connect(mapStateToProps)(SideBar);
