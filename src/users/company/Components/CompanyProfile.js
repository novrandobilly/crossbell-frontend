import React from 'react';

import CompanyBiodata from './CompanyBiodata';
import PersonInCharge from './PersonInCharge';
import CompanyDescription from './CompanyDescription';
import CompanyJobAds from './CompanyJobAds';
import styles from './CompanyProfile.module.scss';

const CompanyProfile = ({ company }) => {
  console.log(company);
  return (
    <div className={styles.CompanyProfileContainer}>
      <section className={styles.CompanyBiodata}>
        <CompanyBiodata
          companyName={company.companyName}
          industry={company.industry}
          website={company.website}
          address={company.address}
          logo={company.logo}
          isActive={company.isActive}
          slot={company.slotREG.length}
        />
      </section>

      <section className={styles.CompanyDescription}>
        <CompanyDescription description={company.briefDescriptions} />
      </section>
      <section className={styles.CompanyPersonInCharge}>
        <PersonInCharge
          name={company.picName}
          email={company.picEmail}
          jobTitle={company.picJobTitle}
          phone={company.picPhone}
          officePhone={company.picOfficePhone}
          npwp={company.NPWP}
        />
      </section>
      <section className={styles.CompanyJobAds}>
        <CompanyJobAds logo={company.logo} companyName={company.companyName} />
      </section>
    </div>
  );
};

export default CompanyProfile;
