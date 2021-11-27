import React, { Fragment, useState, useReducer, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import styles from './ExpiredJobs.module.scss';

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

const ExpiredJobs = props => {
  const [expiredJobsDisplay, setExpiredJobsDisplay] = useState([]);
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
        pageCount: Math.ceil(props.expiredData.length / state.itemsPerPage),
      },
    });
    let jobsDataTemp = props.expiredData.slice(state.startIndex, state.startIndex + state.itemsPerPage);
    setExpiredJobsDisplay(jobsDataTemp);
  }, [props.expiredData, state.startIndex, state.itemsPerPage]);

  let expiredAds =
    expiredJobsDisplay.length > 0 ? (
      expiredJobsDisplay.map(job => {
        return (
          <div key={job.id} className={styles.JobCardContainer}>
            <div className={styles.JobCardHeader}>
              <Link className={styles.JobTitle} to={`/jobs/${job.id}`}>
                {job.jobTitle}
              </Link>
              <div className={styles.Status}>
                <span>Selesai Tayang</span>
                <div style={{ borderRadius: '50%', backgroundColor: '#EF3F37', width: '20px', height: '20px' }}></div>
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
                {/* <button className={styles.DeleteButton} type='button'>
                  Duplicate
                </button> */}
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <p className={styles.EmptyText}>Belum ada iklan pekerjaan yang selesai tayang</p>
    );

  return (
    <Fragment>
      {expiredAds}
      {expiredJobsDisplay.length > 0 && (
        <div className={styles.PaginationContainer}>
          <Pagination count={state.pageCount} page={state.pageNumber} onChange={pageChangeHandler} />
        </div>
      )}
    </Fragment>
  );
};

export default ExpiredJobs;
