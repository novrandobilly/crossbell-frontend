import React, { useReducer, useEffect, useState } from 'react';
import { useForm } from '../../shared/utils/useForm';
import moment from 'moment';

import { VALIDATOR_ALWAYSTRUE } from '../../shared/utils/validator';
import Input from '../../shared/UI_Element/Input';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import JobCard from './JobCard';
import LoadingBar from '../../shared/UI_Element/Spinner/LoadingBar';

import WorkFieldData from '../../shared/UI_Element/PredefinedData/WorkFieldData';
import CitiesData from '../../shared/UI_Element/PredefinedData/CitiesData';

import styles from './JobsList.module.scss';

const ACTIONPAGE = {
  PAGEUPDATE: 'PAGEUPDATE',
};

const initPagination = {
  pageCount: 1,
  pageNumber: 1,
  rowsPerPage: 10,
  startIndex: 0,
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

const JobsList = props => {
  const [displayJobs, setDisplayJobs] = useState([]);
  const [displayData, setDisplayData] = useState();

  const [state, dispatch] = useReducer(paginationReducer, initPagination);
  const [sort, setSort] = useState('newest');
  const [employmentFilter, setEmploymentFilter] = useState([]);
  const [fieldOfWorkFilter, setFieldOfWorkFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const [formState, onInputHandler] = useForm(
    {
      min: {
        value: '',
        isValid: true,
      },
      max: {
        value: '',
        isValid: true,
      },
    },
    true
  );

  const { items } = props;
  useEffect(() => {
    if (items && items.length > 0) {
      let filteredArray = [...items];
      if (employmentFilter && employmentFilter.length > 0) {
        filteredArray = filteredArray.filter(el => {
          return employmentFilter.some(gen => gen === el.employment);
        });
      }

      if (fieldOfWorkFilter) {
        filteredArray = filteredArray.filter(app => {
          return app.fieldOfWork.some(fow => fow === fieldOfWorkFilter);
        });
      }
      if (locationFilter) {
        filteredArray = filteredArray.filter(el => {
          return el.placementLocation === locationFilter;
        });
      }

      if (formState.inputs.min.value > 0) {
        filteredArray = filteredArray.filter(el => {
          let tempSalary = parseInt(el.salary);
          return tempSalary >= formState.inputs.min.value;
        });
      }

      if (formState.inputs.max.value > 0) {
        filteredArray = filteredArray.filter(el => {
          let tempSalary = parseInt(el.salary);
          return tempSalary <= formState.inputs.max.value;
        });
      }

      setDisplayData(filteredArray);
    } else {
      setDisplayData(items);
    }
  }, [items, employmentFilter, fieldOfWorkFilter, locationFilter, formState]);

  useEffect(() => {
    let filteredJobs = [];
    if (displayData && displayData.length > 0) {
      filteredJobs = [...displayData].sort((a, b) => {
        if (sort === 'newest') {
          return moment(b.createdAt) - moment(a.createdAt);
        }
        if (sort === 'latest') {
          return moment(a.createdAt) - moment(b.createdAt);
        }
        if (sort === 'highSalary') {
          return b.salary - a.salary;
        }
        if (sort === 'lowSalary') {
          return a.salary - b.salary;
        }
        return console.log('changed');
      });
      let pageCount = Math.ceil(filteredJobs.length / state.rowsPerPage);
      dispatch({ type: ACTIONPAGE.PAGEUPDATE, payload: { pageCount } });

      //Slicing all jobs based on the number jobs may appear in one page
      filteredJobs = filteredJobs.slice(state.startIndex, state.startIndex + state.rowsPerPage);
    }
    setDisplayJobs(filteredJobs);
  }, [sort, displayData, state.startIndex, state.rowsPerPage, state.pageNumber]);

  //================= Pagination ===========================

  const pageChangeHandler = (event, value) => {
    dispatch({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        pageNumber: value,
        startIndex: state.rowsPerPage * (value - 1),
      },
    });
    localStorage.setItem('dasboardPage', value);
  };

  const rowsHandler = event => {
    dispatch({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        rowsPerPage: event.target.value,
      },
    });
  };

  //================= Sort ===========================

  const handleChange = event => {
    setSort(event.target.value);
  };

  //================= Employment Filter ===========================
  const onEmploymentHandler = e => {
    setEmploymentFilter(prevState => {
      let tempArray = [...prevState];

      if (e.target.checked) {
        tempArray = [...tempArray, e.target.value];
      } else {
        tempArray = tempArray.filter(el => el !== e.target.value);
      }
      return tempArray;
    });
  };

  //================= Loc/Shift Filter ===========================
  const handleLocationChange = (e, value) => {
    setLocationFilter(value);
  };

  //=================== Field Of Work Filter ====================================
  const handleWorkFieldChange = (e, value) => {
    setFieldOfWorkFilter(value);
  };

  let cities = [];
  for (const key in CitiesData) {
    if (key !== 'default') cities = [...cities, ...CitiesData[key]];
  }

  //================= Element Component ===========================
  let content = (
    <div className={styles.LoadingContainer}>
      <LoadingBar />
    </div>
  );
  if (items) {
    content =
      displayJobs && displayJobs.length > 0 ? (
        <div className={styles.JobListing}>
          {displayJobs.map(job => (
            <JobCard
              key={job._id}
              isHidden={job.isHidden}
              jobId={job._id}
              jobTitle={job.jobTitle}
              placementLocation={job.placementLocation}
              company={job.companyId.companyName}
              logo={job.companyId.logo}
              salary={job.salary}
              emailRecipient={job.companyId.emailRecipient}
              companyId={job.companyId}
              fieldOfWork={job.fieldOfWork}
              jobApplicant={job.jobApplicants}
              releasedAt={job.releasedAt}
            />
          ))}
        </div>
      ) : props.jobEmpty ? (
        <h2>Tidak ada lowongan pekerjaan yang tersedia.</h2>
      ) : (
        <h2>Tidak ada pekerjaan yang sesuai.</h2>
      );
  }

  return (
    <div className={styles.Container}>
      <div className={styles.FilterContainer}>
        <div className={styles.SortCriteria}>
          <p className={styles.FilterTitle}>Sortir</p>

          <FormControl
            style={{
              width: '100%',
              textAlign: 'left',
              marginTop: '16px',
            }}>
            <InputLabel id='sort'>Pilih</InputLabel>
            <Select labelId='sort' id='sort' value={sort} onChange={handleChange}>
              <MenuItem value='newest'>Terbaru</MenuItem>
              <MenuItem value='latest'>Terlama</MenuItem>
              <MenuItem value='highSalary'>Gaji Tertinggi</MenuItem>
              <MenuItem value='lowSalary'>Gaji Terendah</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={styles.CheckboxCriteria}>
          <p className={styles.FilterTitle}>Filter</p>
          <p className={styles.FilterLabel}>Bidang pekerjaan</p>
          <Autocomplete
            id='fieldOfWorkFilter'
            name='fieldOfWorkFilter'
            options={WorkFieldData.map(option => option.field)}
            onChange={handleWorkFieldChange}
            style={{ width: '100%' }}
            renderInput={params => (
              <TextField {...params} style={{ marginTop: '0' }} label='Pilih*' margin='normal' variant='standard' />
            )}
          />
        </div>

        <div className={styles.CheckboxCriteria}>
          <p className={styles.FilterLabel}>Lokasi</p>
          <Autocomplete
            id='locationFilter'
            name='locationFilter'
            options={cities.map(option => option)}
            onChange={handleLocationChange}
            style={{ width: '100%' }}
            renderInput={params => (
              <TextField {...params} style={{ marginTop: '0' }} label='Pilih*' margin='normal' variant='standard' />
            )}
          />
        </div>

        <div className={styles.CheckboxCriteria}>
          <p className={styles.FilterLabel}>Kontrak Kerja</p>
          <div onChange={onEmploymentHandler}>
            <div className={styles.CheckboxHolder}>
              <Checkbox color='primary' size='small' value='contract' id='contract' />
              <p>Kontrak</p>
            </div>
            <div className={styles.CheckboxHolder}>
              <Checkbox color='primary' size='small' value='permanent' id='permanent' />
              <p>Permanen</p>
            </div>
            <div className={styles.CheckboxHolder}>
              <Checkbox color='primary' size='small' value='intern' id='intern' />
              <p>Intern/Magang</p>
            </div>
          </div>
        </div>

        <div className={styles.CheckboxCriteria}>
          <p className={styles.FilterLabel}>Gaji</p>
          <div className={styles.InputHolder}>
            <p>Min</p>

            <Input
              inputType='input'
              id='min'
              InputClass='Salary'
              validatorMethod={[VALIDATOR_ALWAYSTRUE]}
              onInputHandler={onInputHandler}
              type='number'
              initValue='0'
              min='0'
              step='1000'
            />
          </div>
        </div>
      </div>
      <div className={styles.JobContainer}>
        {content}
        {items && (
          <div className={styles.PaginationBox}>
            <div className={styles.Pagination}>
              <FormControl style={{ width: '4rem' }}>
                <Select labelId='rowPerPage' id='rowPerPageSelect' value={state.rowsPerPage} onChange={rowsHandler}>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
                <FormHelperText>Rows</FormHelperText>
              </FormControl>
              <Pagination count={state.pageCount} page={state.pageNumber} onChange={pageChangeHandler} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsList;
