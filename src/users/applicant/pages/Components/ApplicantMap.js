import React from 'react';

import ApplicantCard from './ApplicantCard';

const ApplicantMap = props => {
	console.log(props.items.experience);
	return (
		<div>
			<ApplicantCard
				//======================== Applicant Intro
				key={props.id}
				id={props.id}
				firstName={props.items.firstName}
				lastName={props.items.lastName}
				headline={props.items.headline}
				dateOfBirth={props.items.dateOfBirth}
				address={props.items.address}
				city={props.items.city}
				state={props.items.state}
				zip={props.items.zip}
				email={props.items.email}
				phone={props.items.phone}
				websites={props.items.websites}
				details={props.items.details}
				dob={props.items.dob}
				picture={props.items.picture}
				resume={props.items.resume}
				// ======================================== Applicant Education
				education={props.items.education}
				//============================================= Applicant Experience
				experience={props.items.experience}
				//================================================ Applicant Certification
				certification={props.items.certification}
				//=========================================== Applicant Skill
				skills={props.items.skills}
			/>
		</div>
	);
};

export default ApplicantMap;
