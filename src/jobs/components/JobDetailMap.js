import React from "react";

import JobContainer from "./JobContainer";

const JobDetailMap = (props) => {
  if (props.items.length <= 0) {
    return (
      <div className="centerGlobal">
        <h2>No Job Available at the moment!</h2>
      </div>
    );
  }

  return (
    <div>
      {props.items.map((job) => (
        <JobContainer
          key={job.id}
          id={job.id}
          logo={job.logo}
          jobName={job.jobName}
          name={job.name}
          city={job.city}
          datePosted={job.datePosted}
          payment={job.payment}
          employment={job.employment}
          level={job.level}
          industry={job.industry}
          jobFunction={job.jobFunction}
          detail={job.detail}
          benefits={job.benefits}
        />
      ))}
    </div>
  );
};

export default JobDetailMap;
