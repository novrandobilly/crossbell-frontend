import React from 'react';
import { connect } from 'react-redux';

import CompanyBiodata from './CompanyBiodata';
import PersonInCharge from './PersonInCharge';
import CompanyDescription from './CompanyDescription';
import CompanyJobAds from './CompanyJobAds';
import styles from './CompanyProfile.module.scss';
import moment from 'moment';

const CompanyProfile = props => {
  const { company } = props;
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
          remainingSlot={
            company.slotREG.filter(slot => slot.status === 'Idle' && moment(slot.slotExpirationDate) >= moment()).length
          }
          fetchCompany={props.fetchCompany}
        />
      </section>

      <section className={styles.CompanyDescription}>
        <CompanyDescription description={company.briefDescriptions} />
      </section>

      {(props.auth.isCompany || props.admin.isAdmin) && (
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
      )}
      <section className={styles.CompanyJobAds}>
        <CompanyJobAds logo={company.logo} companyName={company.companyName} companyId={company.id} />
      </section>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    admin: state.admin,
  };
};
export default connect(mapStateToProps)(CompanyProfile);
