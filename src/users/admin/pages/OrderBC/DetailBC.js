import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import moment from 'moment';

import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_MIN } from '../../../../shared/utils/validator';
import Input from '../../../../shared/UI_Element/Input';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Spinner from '../../../../shared/UI_Element/Spinner/Spinner';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import classes from './DetailBC.module.css';

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

const DetailBC = (props) => {
  const { orderid } = useParams();

  const [genderFilter, setGenderFilter] = useState([]);
  const [educationFilter, setEducationFilter] = useState([]);
  const [shiftFilter, setShiftFilter] = useState(null);
  const [locationFilter, setLocationFilter] = useState(null);
  const [displayData, setDisplayData] = useState();
  const [applicantList, setApplicantList] = useState([]);

  const [dataBC, setDataBC] = useState();
  const [dataApplicant, setDataApplicant] = useState();
  const [index, setIndex] = useState(null);
  const [indexIsLoading, setIndexIsLoading] = useState(false);
  const [displayApplicant, setDisplayApplicant] = useState();

  const [state, dispatch] = useReducer(paginationReducer, initPagination);

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

  const { getOrderInvoice, getAllApplicant } = props;
  const token = props.admin.token;
  useEffect(() => {
    if (token) {
      const dataBC = {
        token: token,
        orderId: orderid,
      };

      getOrderInvoice(dataBC)
        .then((res) => {
          console.log(res);
          setDataBC(res.order);
          setApplicantList(res.order.applicantSent);
        })
        .catch((err) => {
          console.log(err);
        });

      getAllApplicant(dataBC)
        .then((res) => {
          console.log(res);
          setDataApplicant(res.wholeApplicants);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [getOrderInvoice, getAllApplicant, orderid, token]);

  useEffect(() => {
    if (dataApplicant && dataApplicant.length > 0) {
      let filteredArray = [...dataApplicant];

      if (genderFilter && genderFilter.length > 0) {
        filteredArray = filteredArray.filter((el) => {
          return genderFilter.some((gen) => gen === el.gender);
        });
      }

      if (educationFilter && educationFilter.length > 0) {
        filteredArray = filteredArray.filter((app) => {
          return app.education.some((edu) => {
            return educationFilter.some((fil) => fil === edu.degree);
          });
        });
      }
      if (formState.inputs.min.value > 0) {
        filteredArray = filteredArray.filter((el) => {
          let tempAge = moment().diff(moment(el.dateOfBirth), 'year');
          console.log(tempAge);
          return tempAge >= formState.inputs.min.value;
        });
      }

      if (formState.inputs.max.value > 0) {
        filteredArray = filteredArray.filter((el) => {
          let tempAge = moment().diff(moment(el.dateOfBirth), 'year');
          return tempAge <= formState.inputs.max.value;
        });
      }
      if (locationFilter) {
        filteredArray = filteredArray.filter((el) => {
          return el.outOfTown === true;
        });
      }
      if (shiftFilter) {
        filteredArray = filteredArray.filter((el) => {
          return el.workShifts === true;
        });
      }
      let pageCount = Math.ceil(filteredArray.length / state.rowsPerPage);
      dispatch({ type: ACTIONPAGE.PAGEUPDATE, payload: { pageCount } });

      //Slicing all jobs based on the number jobs may appear in one page
      filteredArray = filteredArray.slice(
        state.startIndex,
        state.startIndex + state.rowsPerPage
      );
      setDisplayData(filteredArray);
    }
  }, [
    dataApplicant,
    genderFilter,
    educationFilter,
    locationFilter,
    shiftFilter,
    formState,
    state.rowsPerPage,
    state.startIndex,
  ]);

  //================= Gender Filter ===========================
  const onGenderHandler = (e) => {
    setGenderFilter((prevState) => {
      let tempArray = [...prevState];
      if (e.target.checked) {
        tempArray = [...tempArray, e.target.value];
      } else {
        tempArray = tempArray.filter((el) => el !== e.target.value);
      }
      return tempArray;
    });
  };

  const onEducationHandler = (e) => {
    setEducationFilter((prevState) => {
      let tempArray = [...prevState];
      if (e.target.checked) {
        tempArray = [...tempArray, e.target.value];
      } else {
        tempArray = tempArray.filter((el) => el !== e.target.value);
      }
      return tempArray;
    });
  };

  //================= Loc/Shift Filter ===========================
  const onLocationHandler = (e) => {
    setLocationFilter(e.target.checked ? true : false);
  };
  const onShiftHandler = (e) => {
    setShiftFilter(e.target.checked ? true : false);
  };

  //================= Sent Function ===========================
  const onSentHandler = async (dataBC) => {
    setIndex(dataBC.i);
    setIndexIsLoading(true);
    const applicantBC = {
      token: props.admin.token,
      applicantId: dataBC.applicantId,
      orderId: orderid,
    };
    try {
      const res = await props.sentApplicantBC(applicantBC);
      if (res) {
        let applicantArray = [...applicantList, dataBC.applicantId];
        setApplicantList(applicantArray);
        setIndexIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIndexIsLoading(false);
    }
  };
  //================= Pagination ===========================

  const pageChangeHandler = (event, value) => {
    dispatch({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        pageNumber: value,
        startIndex: state.rowsPerPage * (value - 1),
      },
    });
  };

  const rowsHandler = (event) => {
    console.log(event.target.value);
    dispatch({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        rowsPerPage: event.target.value,
      },
    });
  };

  //================= Element Component ===========================
  let content = <SpinnerCircle />;

  if (!props.isLoading && displayData && dataBC) {
    content = (
      <div className={classes.Container}>
        <div className={classes.FilterContainer}>
          <div className={classes.CheckboxCriteria}>
            <p className={classes.FilterLabel}>Jenis Kelamin</p>
            <div onChange={onGenderHandler}>
              <div className={classes.CheckboxHolder}>
                <Checkbox color='primary' size='small' value='male' id='pria' />
                <p>Pria</p>
              </div>
              <div className={classes.CheckboxHolder}>
                <Checkbox
                  color='primary'
                  size='small'
                  value='female'
                  id='wanita'
                />
                <p>Wanita</p>
              </div>
            </div>
          </div>

          <div className={classes.CheckboxCriteria}>
            <p className={classes.FilterLabel}>Pendidikan</p>
            <div className={classes.FlexWrap} onChange={onEducationHandler}>
              <div className={classes.CheckboxHolder}>
                <Checkbox color='primary' size='small' id='SMK' value='SMK' />
                <p>SMK</p>
              </div>
              <div className={classes.CheckboxHolder}>
                <Checkbox color='primary' size='small' id='SMA' value='SMA' />
                <p>SMA</p>
              </div>
              <div className={classes.CheckboxHolder}>
                <Checkbox color='primary' size='small' id='D3' value='D3' />
                <p>D3</p>
              </div>
              <div className={classes.CheckboxHolder}>
                <Checkbox color='primary' size='small' id='S1' value='S1' />
                <p>S1</p>
              </div>
              <div className={classes.CheckboxHolder}>
                <Checkbox color='primary' size='small' id='S2' value='S2' />
                <p>S2</p>
              </div>
              <div className={classes.CheckboxHolder}>
                <Checkbox color='primary' size='small' id='S3' value='S3' />
                <p>S3</p>
              </div>
            </div>
          </div>

          <div className={classes.CheckboxCriteria}>
            <p className={classes.FilterLabel}>Kebersediaan</p>
            <div className={classes.CheckboxHolder}>
              <Checkbox
                color='primary'
                size='small'
                id='location'
                value='location'
                onChange={onLocationHandler}
              />
              <p>Luar kota</p>
            </div>
            <div className={classes.CheckboxHolder}>
              <Checkbox
                color='primary'
                size='small'
                id='shift'
                value='shift'
                onChange={onShiftHandler}
              />
              <p>Bekerja shift</p>
            </div>
          </div>

          <div className={classes.CheckboxCriteria}>
            <p className={classes.FilterLabel}>Usia</p>
            <div className={classes.AgeGroup}>
              <Input
                inputType='input'
                id='min'
                InputClass='Age'
                labelClass='Range'
                validatorMethod={[VALIDATOR_MIN(1)]}
                onInputHandler={onInputHandler}
                type='number'
                initValue='0'
                min='0'
                step='1'
                label='min'
              />
              <Input
                inputType='number'
                id='max'
                InputClass='Age'
                labelClass='Range'
                validatorMethod={[VALIDATOR_MIN(1)]}
                onInputHandler={onInputHandler}
                type='number'
                initValue='0'
                min='0'
                step='1'
                label='max'
              />
            </div>
          </div>
        </div>
        <div className={classes.OrderContainer}>
          <div className={classes.CriteriaContainer}>
            <div className={classes.CriteriaTop}>
              <div className={classes.CriteriaHeader}>
                <p>Kriteria </p>
              </div>
              <div className={classes.CriteriaHolder}>
                <p>Posisi </p>
                <p className={classes.CriteriaRight}>
                  <strong>{dataBC.jobFunction}</strong>
                </p>
              </div>
              <div className={classes.CriteriaHolder}>
                <p>Jenis Kelamin </p>
                <p className={classes.CriteriaRight}>
                  <strong>{dataBC.gender}</strong>
                </p>
              </div>
              <div className={classes.CriteriaHolder}>
                <p>Pendidikan </p>
                <p className={classes.CriteriaRight}>
                  <strong>{dataBC.education}</strong>
                </p>
              </div>
              <div className={classes.CriteriaHolder}>
                <p>Usia</p>
                <p className={classes.CriteriaRight}>
                  <strong>
                    {dataBC.age.min} - {dataBC.age.max}
                  </strong>
                </p>
              </div>
            </div>
            <p>
              ditempatkan di kota lain
              {dataBC.location ? (
                <CheckCircleOutlineIcon
                  style={{
                    color: '#90ee90',
                    margin: '0 0.4rem -0.4rem 0.5rem',
                  }}
                />
              ) : (
                <HighlightOffIcon
                  style={{
                    color: '#D41E21',
                    margin: '0 0.4rem -0.4rem 0.5rem',
                  }}
                />
              )}
            </p>
            <p>
              bekerja secara shift
              {dataBC.location ? (
                <CheckCircleOutlineIcon
                  style={{
                    color: '#90ee90',
                    margin: '0 0.5rem -0.4rem 0.5rem',
                  }}
                />
              ) : (
                <HighlightOffIcon
                  style={{
                    color: '#D41E21',
                    margin: '0 0.5rem -0.4rem 0.5rem',
                  }}
                />
              )}
            </p>
            <p>Catatan: {dataBC.note}</p>
            <div className={classes.CriteriaFooter}>
              <p style={{ color: 'white' }}>Jumlah kandidat: {dataBC.amount}</p>
              <div style={{ lineHeight: '0', fontSize: '0.8rem' }}>
                <p>{dataBC.companyId.companyName}</p>
                <p>{dataBC.companyId.emailRecipient}</p>
              </div>
            </div>
          </div>
          <div className={classes.ApplicantSearch}>
            <table>
              <thead className={classes.TableRow}>
                <tr>
                  <th>no</th>
                  <th>nama</th>
                  <th>gender</th>
                  <th>pendidikan</th>
                  <th>Umur</th>
                  <th>luar kota</th>
                  <th>shift</th>
                  <th>Kirim</th>
                </tr>
              </thead>
              <tbody className={classes.TableColumn}>
                {displayData.map((app, i) => {
                  return (
                    <tr key={app.id}>
                      <th>{i + 1}</th>
                      <th>
                        {app.firstName} {app.lastName}
                      </th>
                      <th>{app.gender}</th>
                      <th>
                        <div className={classes.EducationField}>
                          {app.education.map((edu, i) => {
                            return (
                              <p key={i}>
                                {edu.degree}
                                <span>, </span>
                              </p>
                            );
                          })}
                        </div>
                      </th>
                      <th style={app.dateOfBirth ? null : { color: 'gray' }}>
                        {app.dateOfBirth
                          ? moment().diff(moment(app.dateOfBirth), 'year')
                          : 'null'}
                      </th>
                      <th>
                        {app.outOfTown ? (
                          <CheckCircleOutlineIcon
                            style={{
                              color: '#90ee90',
                              margin: '0 0.5rem -0.4rem 0.5rem',
                            }}
                          />
                        ) : (
                          <HighlightOffIcon
                            style={{
                              color: '#D41E21',
                              margin: '0 0.5rem -0.4rem 0.5rem',
                            }}
                          />
                        )}
                      </th>
                      <th>
                        {app.workShifts ? (
                          <CheckCircleOutlineIcon
                            style={{
                              color: '#90ee90',
                              margin: '0 0.5rem -0.4rem 0.5rem',
                            }}
                          />
                        ) : (
                          <HighlightOffIcon
                            style={{
                              color: '#D41E21',
                              margin: '0 0.5rem -0.4rem 0.5rem',
                            }}
                          />
                        )}
                      </th>

                      <th>
                        {indexIsLoading && index === i ? (
                          <Spinner />
                        ) : (
                          <Button
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            size='small'
                            endIcon={<SendIcon />}
                            disabled={applicantList.some(
                              (appId) => appId.toString() === app.id.toString()
                            )}
                            onClick={() =>
                              onSentHandler({
                                applicantId: app.id,
                                i,
                              })
                            }
                          >
                            Send
                          </Button>
                        )}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <FormControl style={{ width: '4rem' }}>
            <Select
              labelId='rowPerPage'
              id='rowPerPageSelect'
              value={state.rowsPerPage}
              onChange={rowsHandler}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
            <FormHelperText>Rows</FormHelperText>
          </FormControl>
          <Pagination
            count={state.pageCount}
            page={state.pageNumber}
            onChange={pageChangeHandler}
          />
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    isLoading: state.admin.isLoading,
    error: state.admin.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderInvoice: (data) => dispatch(actionCreators.getOrderInvoice(data)),
    getAllApplicant: (token) => dispatch(actionCreators.getAllApplicant(token)),
    sentApplicantBC: (data) => dispatch(actionCreators.sentApplicantBC(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailBC);
