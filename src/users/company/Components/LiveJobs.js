import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router';

import styles from './LiveJobs.module.scss';

const LiveJobs = props => {
  let liveAds =
    props.liveJobs.length > 0 ? (
      props.liveJobs.map(job => {
        return (
          <div key={job.id} className={styles.JobCardContainer}>
            <div className={styles.JobCardHeader}>
              <h3 className={styles.JobTitle} onClick={() => props.history.push(`/jobs/${job.id}`)}>
                {job.jobTitle}
              </h3>
              <div className={styles.Status}>
                <span>Sedang Tayang</span>
                <div style={{ borderRadius: '50%', backgroundColor: '#00a31b', width: '20px', height: '20px' }}></div>
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

              <div
                className={styles.NumberOfApplicants}
                onClick={() => props.history.push(`/jobs/appliedCandidatesList/${job.id}`)}>
                <p>Jumlah Pelamar</p>
                <p id={styles.NumberOfApplicants}>{job.jobApplicants.length}</p>
                <p>
                  <em>Lihat Semua</em>
                </p>
              </div>

              <div className={styles.ControlButton}>
                <button
                  className={styles.EditButton}
                  type='button'
                  onClick={() => props.history.push(`/jobs/${job.id}/edit`)}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <p className={styles.EmptyText}>Belum ada iklan pekerjaan yang sedang tayang</p>
    );

  return liveAds;
};

export default withRouter(LiveJobs);
