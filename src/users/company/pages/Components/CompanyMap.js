import React from "react";

import CompanyCard from "./CompanyCard";

const CompanyMap = (props) => {
  return (
    <div>
      {props.items.map((Comp) => (
        <CompanyCard
          key={Comp.id}
          id={Comp.id}
          name={Comp.name}
          logo={Comp.logo}
          size={Comp.size}
          industry={Comp.industry}
          address={Comp.address}
          websites={Comp.websites}
          detail={Comp.detail}
          mission={Comp.mission}
        />
      ))}
    </div>
  );
};

export default CompanyMap;
