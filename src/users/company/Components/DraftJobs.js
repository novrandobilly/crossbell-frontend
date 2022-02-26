import React, { Fragment, useState, useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Modal from '../../../shared/UI_Element/Modal';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import Pagination from '@mui/material/Pagination';

import styles from './DraftJobs.module.scss';

const ACTIONPAGE = {
  PAGEUPDATE: 'PAGEUPDATE',
};

const initPagination = {
  pageCount: 1,
  pageNumber: 1,
  startIndex: 0,
  itemsPerPage: 5,
};

const paginationReducer = (state, action) => {
  switch (action.type) {
    case ACTIONPAGE.PAGEUPDATE: {
      let update = {};
      for (const key in action.payload) {
        update[key] = action.payload[key];
      }
      return {
        ...state,
        ...update,
      };
    }
    default:
      return state;
  }
};

const DraftJobs = (props) => {
  const [openDeleteDraft, setOpenDeleteDraft] = useState(false);
  const [draftJobId, setDraftJobId] = useState(null);
  const [draftJobsDisplay, setDraftJobsDisplay] = useState([]);
  const [state, dispatch] = useReducer(paginationReducer, initPagination);

  const pageChangeHandler = (event, value) => {
    dispatch({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        pageNumber: value,
        startIndex: state.itemsPerPage * (value - 1),
      },
    });
  };

  // Change Page Job Data
  useEffect(() => {
    dispatch({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        pageCount: Math.ceil(props.draftJobs.length / state.itemsPerPage),
      },
    });
    let jobsDataTemp = props.draftJobs.slice(state.startIndex, state.startIndex + state.itemsPerPage);
    setDraftJobsDisplay(jobsDataTemp);
  }, [props.draftJobs, state.startIndex, state.itemsPerPage]);

  const openDeleteDraftHandler = (payload) => {
    setDraftJobId(payload);
    setOpenDeleteDraft(true);
  };
  const closeDeleteDraftHandler = () => setOpenDeleteDraft(false);

  const deleteDraft = async (draftId) => {
    try {
      await props.onDelete(draftId);
      closeDeleteDraftHandler();
    } catch (err) {
      console.log(err);
    }
  };

  let draftAds =
    draftJobsDisplay.length > 0 ? (
      draftJobsDisplay.map((job) => {
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
                  Bidang Pekerjaan: <strong>{job.fieldOfWork[0]}</strong>
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
        style={{ top: '35vh', maxWidth: '500px', marginLeft: '-250px', height: '120px', overflowY: 'auto' }}>
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
      {draftJobsDisplay.length > 0 && (
        <div className={styles.PaginationContainer}>
          <Pagination count={state.pageCount} page={state.pageNumber} onChange={pageChangeHandler} />
        </div>
      )}
    </Fragment>
  );
};

export default DraftJobs;
