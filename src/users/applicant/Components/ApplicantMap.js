import React from 'react';

import ApplicantCard from './ApplicantCard';

const ApplicantMap = (props) => {
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
        details={props.items.details}
        dob={props.items.dateOfBirth}
        picture={props.items.picture}
        resume={props.items.resume}
        salary={props.items.salary}
        // ======================================== Applicant Education
        education={props.items.education}
        //============================================= Applicant Experience
        experience={props.items.experience}
        //================================================ Applicant Certification
        certification={props.items.certification}
        //================================================ Applicant Organization
        organization={props.items.organization}
        //=========================================== Applicant Skill
        skills={props.items.skills}
        //=========================================== Applicant Languages
        languages={props.items.languages}
      />
    </div>
  );
};

export default ApplicantMap;
