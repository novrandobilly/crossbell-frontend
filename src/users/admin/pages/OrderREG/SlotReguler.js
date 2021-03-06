import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import moment from 'moment';

import * as actionCreators from '../../../../store/actions/index';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '../../../../shared/UI_Element/Input';
import { VALIDATOR_ALWAYSTRUE } from '../../../../shared/utils/validator';

import classes from './SlotReguler.module.css';

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

const SlotReg = props => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [displayData, setDisplayData] = useState();

  const [usedPrice, setUsedPrice] = useState([]);
  const [usedRevenue, setUsedRevenue] = useState(0);

  const [idlePrice, setIdlePrice] = useState([]);
  const [idleRevenue, setIdleRevenue] = useState(0);

  const [expiredPrice, setExpiredPrice] = useState([]);
  const [expiredRevenue, setExpiredRevenue] = useState(0);

  const [state, dispatch] = useReducer(paginationReducer, initPagination);

  const [statusFilter, setStatusFilter] = useState('');
  // const [formState, onInputHandler] = useForm(
  //   {
  //     timeFilter: {
  //       value: null,
  //       isValid: true,
  //     },
  //   },
  //   true
  // );

  const [formState, onInputHandler] = useForm(
    {
      start: {
        value: null,
        isValid: true,
      },
      end: {
        value: null,
        isValid: true,
      },
    },
    true
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getAllSlot } = props;
  useEffect(() => {
    if (props.admin.token) {
      let sort = [];
      getAllSlot(props.admin.token).then(res => {
        sort = res.slotReg;
        sort = sort.sort((a, b) => moment(a.slotExpirationDate) - moment(b.slotExpirationDate));
        setData(sort);
      });
    }
  }, [getAllSlot, props.admin.token]);

  useEffect(() => {
    let filterData = [...data];
    if (statusFilter !== 'All' && statusFilter !== '') {
      filterData = filterData.filter(data => {
        return data.status === statusFilter;
      });
    } else {
      filterData = [...data];
    }

    let statusData = [...filterData];
    if (formState?.inputs?.start?.value && formState?.inputs?.end?.value) {
      statusData = statusData.filter(order =>
        moment(order.slotPaymentDate).isBetween(
          moment(moment(formState.inputs.start.value).format('LL')),
          moment(`${moment(formState.inputs.end.value).format('LL')} 23:59:59`),
          undefined,
          []
        )
      );
    }
    setDisplayData(statusData);

    setFilteredData(statusData);
  }, [formState.inputs.start.value, formState.inputs.end.value, statusFilter, data]);

  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      let applicantArray = [...filteredData];
      let pageCount = Math.ceil(applicantArray.length / state.rowsPerPage);
      dispatch({ type: ACTIONPAGE.PAGEUPDATE, payload: { pageCount } });

      applicantArray = applicantArray.slice(state.startIndex, state.startIndex + state.rowsPerPage);
      setDisplayData(applicantArray);
    }
  }, [state.rowsPerPage, state.startIndex, filteredData]);

  useEffect(() => {
    if (filteredData) {
      let arrIdlePrice = filteredData
        .filter(fil => {
          return fil.status === 'Idle';
        })
        .map(data => {
          return data.pricePerSlot;
        });
      setIdlePrice(arrIdlePrice);

      let arrUsedPrice = filteredData
        .filter(fil => {
          return fil.status === 'Used';
        })
        .map(data => {
          return data.pricePerSlot;
        });
      setUsedPrice(arrUsedPrice);

      let arrExpiredPrice = filteredData
        .filter(fil => {
          return fil.status === 'Expired';
        })
        .map(data => {
          return data.pricePerSlot;
        });
      setExpiredPrice(arrExpiredPrice);
    }
  }, [filteredData]);

  useEffect(() => {
    if (idlePrice) {
      let idleRev = 0;
      idlePrice.map(data => {
        idleRev = idleRev + data;
        return idleRev;
      });
      setIdleRevenue(idleRev);
    }

    if (usedPrice) {
      let usedRev = 0;
      usedPrice.map(data => {
        usedRev = usedRev + data;
        return usedRev;
      });
      setUsedRevenue(usedRev);
    }

    if (expiredPrice) {
      let expiredRev = 0;
      expiredPrice.map(data => {
        expiredRev = expiredRev + data;
        return expiredRev;
      });
      setExpiredRevenue(expiredRev);
    }
  }, [idlePrice, expiredPrice, usedPrice]);

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

  const rowsHandler = event => {
    dispatch({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        rowsPerPage: event.target.value,
      },
    });
  };

  const handleChange = event => {
    setStatusFilter(event.target.value);
  };

  let content = <LoadingBar />;

  if (!props.isLoading && data && displayData) {
    content = (
      <div className={classes.TableHolder}>
        <table className={classes.Table}>
          <thead className={classes.RowField}>
            <tr>
              <th>No</th>
              <th>Nama Paket</th>
              <th>Perusahaan</th>
              <th>Harga</th>
              <th>Status</th>
              <th>Job Id</th>
              <th>Tanggal Pembayaran</th>
              <th>Tanggal Expired</th>
              <th>Tanggal Digunakan</th>
            </tr>
          </thead>

          <tbody className={classes.ColumnField}>
            {displayData.map((slot, i) => (
              <tr key={slot._id}>
                <th> {i + 1 + (state.pageNumber - 1) * state.rowsPerPage}</th>
                <th>{slot.package}</th>
                <th>
                  <Link to={`/co/${slot.companyId._id}/profile`} style={{ color: 'black', textDecoration: 'none' }}>
                    {slot.companyId.companyName}
                  </Link>
                </th>
                <th>Rp.{slot.pricePerSlot.toLocaleString()},-</th>

                <th>{slot.status}</th>
                <th>{slot.jobId ? slot.jobId : 'Belum terpakai'}</th>

                <th>{moment(slot.slotPaymentDate).format('D MMM YYYY')}</th>
                <th>{moment(slot.slotExpirationDate).format('D MMM YYYY')}</th>

                <th>{slot.slotUsedDate ? moment(slot.usedDate).format('D MMM YYYY') : 'Kosong'}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!props.isLoading && filteredData.length < 1) {
    content = <p className={classes.EmptyText}>TIdak ditemukan data sesuai filter</p>;
  }

  return (
    <div className={classes.Page}>
      {' '}
      <div className={classes.Header}>
        <h1 className={classes.PageTitle}>Slot Reguler</h1>

        <div className={classes.FilterDiv}>
          {/* <Input
            inputType='datePicker'
            id='timeFilter'
            validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
            onInputHandler={onInputHandler}
            views={['year', 'month']}
            maxDate={moment()}
            initIsValid={true}
            format='MM/yyyy'
            label='Filter Waktu'
            style={{ width: '50%' }}
          /> */}
          <div className={classes.DateFilter}>
            <p className={classes.DateLabel}>Tanggal awal</p>
            <Input
              inputType='datePicker'
              id='start'
              validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
              onInputHandler={onInputHandler}
              onChange
              views={['year', 'month', 'date']}
              maxDate={moment()}
              initIsValid={true}
              initValue={null}
              format='dd/MM/yyyy'
            />
          </div>

          <div className={classes.DateFilter}>
            <p className={classes.DateLabel}>Tanggal akhir</p>
            <Input
              inputType='datePicker'
              id='end'
              validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
              onInputHandler={onInputHandler}
              views={['year', 'month', 'date']}
              maxDate={moment()}
              initIsValid={true}
              initValue={moment()}
              format='dd/MM/yyyy'
            />
          </div>

          <FormControl
            style={{
              width: '50%',
              textAlign: 'left',
            }}>
            <InputLabel id='statusFilter'>Filter Status</InputLabel>
            <Select labelId='statusFilter' id='statusFilter' value={statusFilter} onChange={handleChange}>
              <MenuItem value='All'>Semua Data</MenuItem>
              <MenuItem value='Idle'>Belum Terpakai</MenuItem>
              <MenuItem value='Used'>Terpakai</MenuItem>
              <MenuItem value='Expired'>Expired</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={classes.Container}>{content}</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
        }}>
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
      <div className={classes.RevenueContainer}>
        <div className={classes.AmountDiv}>
          <div className={classes.AmountLabel}>
            <div className={classes.Label}>Jumlah Slot Terpakai</div>
            <div className={classes.Label}>Jumlah Slot Belum Terpakai</div>
            <div className={classes.Label}>Jumlah Slot Expired</div>
          </div>
          <div className={classes.AmountNumber}>
            <div className={classes.Label}>{usedPrice.length}</div>
            <div className={classes.Label}>{idlePrice.length}</div>
            <div className={classes.Label}>{expiredPrice.length}</div>
          </div>
        </div>

        <div className={classes.RevenueDiv}>
          <div className={classes.RevenueLabel}>
            <div className={classes.Label}>Revenue Used</div>
            <div className={classes.Label}>Revenue Idle</div>
            <div className={classes.Label}>Revenue Expired</div>
          </div>
          <div className={classes.RevenueNumber}>
            <div className={classes.Label}>Rp. {usedRevenue.toLocaleString()},-</div>
            <div className={classes.Label}>Rp. {idleRevenue.toLocaleString()},-</div>
            <div className={classes.Label}>Rp. {expiredRevenue.toLocaleString()},-</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    admin: state.admin,
    isLoading: state.admin.isLoading,
    error: state.admin.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllSlot: data => dispatch(actionCreators.getAllSlot(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotReg);
