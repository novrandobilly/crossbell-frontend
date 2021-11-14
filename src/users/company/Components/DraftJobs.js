import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Modal from '../../../shared/UI_Element/Modal';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';

import styles from './DraftJobs.module.scss';

const DraftJobs = props => {
  const [openDeleteDraft, setOpenDeleteDraft] = useState(false);
  const [draftJobId, setDraftJobId] = useState(null);

  const openDeleteDraftHandler = payload => {
    setDraftJobId(payload);
    setOpenDeleteDraft(true);
  };
  const closeDeleteDraftHandler = () => setOpenDeleteDraft(false);

  const deleteDraft = async draftId => {
    try {
      await props.onDelete(draftId);
      closeDeleteDraftHandler();
    } catch (err) {
      console.log(err);
    }
  };

  let draftAds =
    props.draftJobs.length > 0 ? (
      props.draftJobs.map(job => {
        return (
          <div key={job.id} className={styles.JobCardContainer}>
            <div className={styles.JobCardHeader}>
              <Link className={styles.JobTitle} to={`/jobs/${job.id}`}>
                {job.jobTitle}
              </Link>
              <div className={styles.Status}>
                <span>Belum Tayang</span>
                <div style={{ borderRadius: '50%', backgroundColor: '#666', width: '20px', height: '20px' }}></div>
              </div>
            </div>

            <div className={styles.JobInformations}>
              <div className={styles.JobTimeInformations}>
                <p>
                  Kategori Pekerjaan: <strong>{job.fieldOfWork[0]}</strong>
                </p>
                <p>
                  Tanggal Mulai: <strong>{job.releasedAt ? moment(job.releasedAt).format('LL') : '-'}</strong>
                </p>
                <p>
                  Tanggal Selesai: <strong>{job.expiredDate ? moment(job.expiredDate).format('LL') : '-'}</strong>
                </p>
                <p>
                  Alokasi Slot: <strong>{job.slot ? job.slot : '-'}</strong>
                </p>
              </div>
              <div className={styles.JobBriefRequirements}>
                <p>
                  Usia:{' '}
                  <strong>
                    {job.rangeAge[0]} - {job.rangeAge[1]} tahun
                  </strong>
                </p>

                <p>
                  Tingkat Pendidikan: <strong>{job.educationalStage}</strong>
                </p>
                <p>
                  Pengalaman: <strong>{job.jobExperience} tahun</strong>
                </p>
                <p>
                  Penempatan: <strong>{job.placementLocation}</strong>
                </p>
                <p>
                  Kontrak Kerja: <strong>{job.employment}</strong>
                </p>
              </div>
              <Link className={styles.NumberOfApplicants} to={`/jobs/appliedCandidatesList/${job.id}`}>
                <p>Jumlah Pelamar</p>
                <p id={styles.NumberOfApplicants}>{job.jobApplicants.length}</p>
                <p>
                  <em>Lihat Semua</em>
                </p>
              </Link>
              <div className={styles.ControlButton}>
                <Link className={styles.EditButton} to={`/jobs/new/edit/${job.id}`}>
                  Edit
                </Link>
                <button
                  className={styles.DeleteButton}
                  type='button'
                  onClick={openDeleteDraftHandler.bind(this, job.id)}>
                  Hapus
                </button>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <p className={styles.EmptyText}>Belum ada draft iklan pekerjaan tersimpan</p>
    );

  return (
    <Fragment>
      <Modal
        show={openDeleteDraft}
        onCancel={closeDeleteDraftHandler}
        headerText='Anda yakin ingin menghapus draft ini?'
        style={{ top: '35vh', maxWidth: '400px', marginLeft: '-200px', height: '17vh', overflowY: 'auto' }}>
        <div className={styles.ConfirmationButton}>
          {props.isLoading ? (
            <LoadingBar />
          ) : (
            <>
              <button onClick={closeDeleteDraftHandler}>No</button>
              <button onClick={deleteDraft.bind(this, draftJobId)}>Yes</button>
            </>
          )}
        </div>
      </Modal>
      {draftAds}
    </Fragment>
  );
};

export default DraftJobs;
