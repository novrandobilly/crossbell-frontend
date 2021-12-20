import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import moment from 'moment';

import OrganizationsIcon from '../../../assets/icons/organization.svg';
import AddWhiteIcon from '../../../assets/icons/add-white.svg';
import EditWhiteIcon from '../../../assets/icons/edit-white.svg';
import DeleteIcon from '../../../assets/icons/x-mark.svg';
import Modal from '../../../shared/UI_Element/Modal';
import AddOrganization from './Add/AddOrganization';
import EditOrganization from './Edit/EditOrganization';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import { splitParagraph } from '../../../shared/utils/sharedFunctions';

import styles from './Organizations.module.scss';

const Organizations = (props) => {
  const [openAddOrganization, setOpenAddOrganization] = useState(false);
  const [openEditOrganization, setOpenEditOrganization] = useState(false);
  const [openDeleteOrganization, setOpenDeleteOrganization] = useState(false);
  const [organizationId, setOrganizationId] = useState();

  const onOpenAddOrganizationHandler = () => setOpenAddOrganization(true);
  const onCloseAddOrganizationHandler = () => setOpenAddOrganization(false);

  const onOpenEditOrganizationHandler = (event, orgId) => {
    setOrganizationId(orgId);
    setOpenEditOrganization(true);
  };
  const onCloseEditOrganizationHandler = () => setOpenEditOrganization(false);

  const onOpenDeleteOrganizationHandler = (event, orgId) => {
    setOrganizationId(orgId);
    setOpenDeleteOrganization(true);
  };
  const onCloseDeleteOrganizationHandler = () => setOpenDeleteOrganization(false);

  const onDeleteHandler = async (event) => {
    const payload = {
      applicantId: props.auth.userId,
      token: props.auth.token,
      itemCategories: 'organization',
      itemId: organizationId,
    };
    try {
      await props.deleteItem(payload);
      await props.fetchApplicantData();
      setOpenDeleteOrganization(false);
    } catch (err) {
      console.log(err);
      setOpenDeleteOrganization(false);
    }
  };

  return (
    <Fragment>
      <Modal
        show={openAddOrganization}
        onCancel={onCloseAddOrganizationHandler}
        ContainerClass={styles.OrganizationModal}
        // style={{ top: '18vh', maxWidth: '600px', marginLeft: '-300px', height: '60vh', overflowY: 'auto' }}
        headerText='Tambah Organisasi'>
        <AddOrganization onCancel={onCloseAddOrganizationHandler} fetchApplicantData={props.fetchApplicantData} />
      </Modal>
      <Modal
        show={openEditOrganization}
        onCancel={onCloseEditOrganizationHandler}
        ContainerClass={styles.OrganizationModal}
        // style={{ top: '18vh', maxWidth: '600px', marginLeft: '-300px', height: '60vh', overflowY: 'auto' }}
        headerText='Edit Organisasi'>
        <EditOrganization
          onCancel={onCloseEditOrganizationHandler}
          fetchApplicantData={props.fetchApplicantData}
          organizationId={organizationId}
        />
      </Modal>
      <Modal
        show={openDeleteOrganization}
        onCancel={onCloseDeleteOrganizationHandler}
        style={{ top: '25vh', maxWidth: '400px', marginLeft: '-200px', height: '25vh', overflowY: 'auto' }}>
        <h3>Hapus Pekerjaan?</h3>
        {props.applicant.isLoading ? (
          <LoadingBar />
        ) : (
          <div className={styles.DeleteButtonContainer}>
            <button type='button' onClick={onCloseDeleteOrganizationHandler}>
              Tidak
            </button>
            <button type='button' onClick={onDeleteHandler}>
              Hapus
            </button>
          </div>
        )}
      </Modal>
      <div className={styles.OrganizationsContainer}>
        <h1 className={styles.OrganizationsHeaderTitle}>
          <span className={styles.OrganizationsIcon}>
            <img alt='Working Organization Icon' src={OrganizationsIcon} />
          </span>
          Pengalaman Organisasi
        </h1>

        {props.organizations && props.organizations.length > 0 ? (
          props.organizations.map((org, index) => (
            <article className={styles.OrganizationsItem} key={`${org.prevTitle}_${index}`}>
              <h3 className={styles.OrganizationPeriod}>
                &#x27A4; {moment(org.startDate).format('MMMM YYYY')} -{' '}
                {org.endDate ? moment(org.endDate).format('MMMM YYYY') : 'Sekarang'}
              </h3>
              <h4 className={styles.OrganizationTitle}>{org.organization}</h4>
              {splitParagraph(org.description)}
              {props.EditAuthorized && (
                <Fragment>
                  <span
                    className={`${styles.AddEditButton} ${styles.EditOrganizationItem}`}
                    onClick={(event) => onOpenEditOrganizationHandler(event, org.id)}>
                    <img alt='Edit Button' src={EditWhiteIcon} />
                  </span>

                  <span
                    className={`${styles.AddEditButton} ${styles.DeleteItem}`}
                    onClick={(event) => onOpenDeleteOrganizationHandler(event, org.id)}>
                    <img alt='Delete Button' src={DeleteIcon} />
                  </span>
                </Fragment>
              )}
            </article>
          ))
        ) : (
          <p className={styles.OrganizationsEmpty}>Belum ada pengalaman organisasi.</p>
        )}
        {props.EditAuthorized && (
          <span className={styles.AddEditButton} onClick={onOpenAddOrganizationHandler}>
            <img alt='Add Button' src={AddWhiteIcon} />
          </span>
        )}
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    applicant: state.applicant,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (payload) => dispatch(actionCreators.deleteItem(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
