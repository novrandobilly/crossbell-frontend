import React from 'react';

import ApplicantCard from './ApplicantCard';

const ApplicantMap = props => {
	return (
		<div>
			<ApplicantCard
				//======================== Applicant Intro
				key={props.items.id}
				id={props.items.id}
				name={props.items.name}
				headline={props.items.headline}
				address={props.items.address}
				city={props.items.city}
				state={props.items.state}
				zip={props.items.zip}
				email={props.items.email}
				phone={props.items.phone}
				websites={props.items.websites}
				details={props.items.details}
				dob={props.items.dob}
				// ======================================== Applicant Education
				education={props.items.education}
				school={props.items.education.school}
				degree={props.items.education.degree}
				major={props.items.education.major}
				location={props.items.education.location}
				startEdu={props.items.education.startDate}
				endEdu={props.items.education.endDate}
				description={props.items.education.description}
				//================================================== Applicant Experience
				// experience={props.items.experience}
				prevTitle={props.items.experience.prevTitle}
				prevCompany={props.items.experience.prevCompany}
				prevLocation={props.items.experience.prevLocation}
				startExp={props.items.experience.startDate}
				endExp={props.items.experience.endDate}
				prevDescription={props.items.experience.prevDescription}
				//============================================================ Applicant Certification
				// certification={props.items.certificastion}
				title={props.items.certification.title}
				organization={props.items.certification.organization}
				startCert={props.items.experience.startDate}
				endCert={props.items.experience.endDate}
				certDescription={props.items.certification.description}
			/>
		</div>
	);
};

export default ApplicantMap;
