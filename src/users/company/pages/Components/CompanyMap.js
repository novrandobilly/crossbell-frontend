import React from 'react';

import CompanyCard from './CompanyCard';

const CompanyMap = (props) => {
  return (
    <div>
      <CompanyCard
        key={props.items.companyId}
        companyId={props.items.id}
        companyName={props.items.companyName}
        logo={props.items.logo}
        size={props.items.size}
        industry={props.items.industry}
        address={props.items.address}
        website={props.items.website}
        briefDescriptions={props.items.briefDescriptions}
        picName={props.items.picName}
        picJobTitle={props.items.picJobTitle}
        picEmail={props.items.picEmail}
        picPhone={props.items.picPhone}
        picOfficePhone={props.items.picOfficePhone}
        slotREG={props.items.slotREG}
        isActive={props.items.isActive}
      />
    </div>
  );
};

export default CompanyMap;
