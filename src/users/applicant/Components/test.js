import React from 'react';

const test = () => {
  return (
    <React.Fragment>
      <div className={styles.Container}>
        <div className={styles.ApplicantContainer}>
          <div className={styles.ContainerLeft}>
            <Link to={`/ap/${props.id}/intro`}>
              {props.picture ? (
                <div
                  className={styles.Avatar}
                  style={{
                    backgroundImage: `url('${props.picture.url}')`,
                  }}
                />
              ) : (
                <div
                  className={styles.Avatar}
                  style={{
                    backgroundImage: `url('https://res.cloudinary.com/kalkulus/image/upload/v1616503057/Profile_w6vts3.png')`,
                  }}
                />
              )}
            </Link>

            <div className={styles.ContainerLeftDivider}>
              <p className={styles.Name}>
                {props.firstName} {props.lastName}
              </p>
              <p className={styles.Title}>{props.headline}</p>
              {(props.auth.isCompany || props.admin.isAdmin) && (
                <p className={styles.Email}>Harapan gaji: Rp.{props.salary.toLocaleString()},-</p>
              )}
              <p className={styles.Email}>{props.email}</p>
              <p className={styles.Email}>{props.phone}</p>
              <p className={styles.Address}>{props.address}</p>

              <div className={styles.ResumePreview}>
                {props.resume && (
                  <div className={styles.ResumeHolder}>
                    <img
                      className={styles.ResumePicture}
                      src={`${props.resume.url.slice(0, props.resume.url.length - 4) + '.jpg'}`}
                      alt='resume-preview'
                    />
                    <a
                      href={props.resume.url.slice(0, props.resume.url.length - 4) + '.jpg'}
                      target='_blank'
                      rel='noopener noreferrer'>
                      Preview Resume Here
                    </a>
                  </div>
                )}
              </div>
              {props.auth.userId === props.id && (
                <div>
                  <label className={styles.InputButton}>
                    <input
                      type='file'
                      name='resume'
                      id='resume'
                      onChange={onUploadHandler}
                      accept='.pdf'
                      style={{ display: 'none' }}
                    />
                    <span className={styles.InputButtonText}> Upload Resume </span>
                  </label>
                </div>
              )}

              {resumeFile && (
                <div className={styles.SaveResume}>
                  <p className={styles.FilePreview}>{resumeFile.name}</p>

                  {loadingResume ? (
                    <div className={styles.SaveText}>
                      <LoadingBar />
                    </div>
                  ) : (
                    <span className={styles.SaveText} onClick={onSubmitResumeHandler}>
                      {' '}
                      Save{' '}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className={styles.ContainerRight}>
            {props.auth.isAdmin && (
              <Link to={`/ad/alphaomega/applicants/${props.id}`}>
                <button> Jobs Applied </button>
              </Link>
            )}
            {props.auth.userId === props.id && (
              <Link to={`/ap/${props.id}/intro`}>
                <IconButton />
              </Link>
            )}
          </div>
        </div>
        <div className={styles.LangguagesDiv}>
          <div className={styles.LanguageHeader}>
            <p className={styles.LangguageTitle}>Kemampuan bahasa</p>
            <Link to={`/ap/${props.id}/language`}>
              <IconButton />
            </Link>
          </div>

          <div className={styles.LanguagesContent}>
            {props.languages.map((lang, i) => {
              return (
                <div className={styles.LanguagesBox} key={i}>
                  <p>{lang.langName}</p>
                  <p>{lang.rate}</p>
                </div>
              );
            })}
          </div>
        </div>{' '}
        {props.auth.userId === props.id && (
          <Link to={`/subscription/${props.id}`}>
            <div className={styles.SubscriptionButton}>Ubah Langganan</div>
          </Link>
        )}
      </div>

      <div className={styles.SegmentContainer}>
        <TextOnly
          id={props.id}
          labelName='Tentang Saya'
          route={`/ap/${props.id}/summary`}
          text={props.details}
          applicantid={props.id}
        />

        <RangeSegment
          id={props.id}
          labelName='Pengalaman Kerja'
          routeEdit={`/ap/${props.id}/experience`}
          routeAdd={`/ap/${props.id}/add/experience`}
          contents={props.experience.sort((a, b) => moment(b.startDate) - moment(a.startDate))}
          state='experience'
          isLoading={props.applicant.isLoading}
          token={props.auth.token}
          applicantid={props.id}
          buttonText='Tambah Pengalaman'
        />

        <RangeSegment
          id={props.id}
          labelName='Pendidikan'
          routeEdit={`/ap/${props.id}/education`}
          routeAdd={`/ap/${props.id}/add/education`}
          contents={props.education.sort((a, b) => moment(b.startDate) - moment(a.startDate))}
          state='education'
          isLoading={props.applicant.isLoading}
          token={props.auth.token}
          applicantid={props.id}
          buttonText='Tambah Pendidikan'
        />

        <RangeSegment
          id={props.id}
          labelName='Pengalaman Organisasi'
          routeEdit={`/ap/${props.id}/organization`}
          routeAdd={`/ap/${props.id}/add/organization`}
          contents={props.organization.sort((a, b) => moment(b.startDate) - moment(a.startDate))}
          state='organization'
          isLoading={props.applicant.isLoading}
          token={props.auth.token}
          applicantid={props.id}
          buttonText='Tambah Organisasi'
        />

        <RangeSegment
          id={props.id}
          labelName='Sertifikasi atau Penghargaan'
          routeEdit={`/ap/${props.id}/certification`}
          routeAdd={`/ap/${props.id}/add/certification`}
          contents={props.certification.sort((a, b) => moment(b.startDate) - moment(a.startDate))}
          state='certification'
          isLoading={props.applicant.isLoading}
          token={props.auth.token}
          applicantid={props.id}
          buttonText='Tambah Sertifikasi'
        />

        <SkillsMap
          id={props.id}
          labelName='Keterampilan'
          routeEdit={`/ap/${props.id}/skills`}
          routeAdd={`/ap/${props.id}/add/skills`}
          skills={props.skills}
          token={props.auth.token}
          applicantid={props.id}
        />
      </div>
    </React.Fragment>
  );
};

export default test;
