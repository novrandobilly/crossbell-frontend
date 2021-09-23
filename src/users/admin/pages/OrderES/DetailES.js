import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { validate } from '../../../../shared/utils/validator';
import { useForm } from '../../../../shared/utils/useForm';
// import moment from "moment";

import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_REQUIRE } from '../../../../shared/utils/validator';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import classes from './DetailES.module.css';

const DetailES = (props) => {
  const { orderid } = useParams();

  const [reply, setReply] = useState(false);
  const [replyIndex, setReplyIndex] = useState();
  const [statusIndex, setStatusIndex] = useState();
  const [dataES, setDataES] = useState();
  const [displayData, setDisplayData] = useState();

  const { getOrderInvoice } = props;

  const [formState, onInputHandler] = useForm(
    {
      candidateName: {
        value: '',
        isValid: false,
      },
      candidateEmail: {
        value: '',
        isValid: false,
      },
      candidateContact: {
        value: '',
        isValid: false,
      },
      note: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const onManualHandler = (event, payload) => {
    const value = event.target.value;
    const id = event.target.name;
    const isValid = validate(value, payload.validator);

    onInputHandler(id, value, isValid);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const executiveCandidate = {
      token: props.admin.token,
      orderId: orderid,
      candidateName: formState.inputs.candidateName.value,
      candidateEmail: formState.inputs.candidateEmail.value,
      candidateContact: formState.inputs.candidateContact.value,
    };

    const CandidateState = {
      status: 'Open',
      candidateName: formState.inputs.candidateName.value,
      candidateEmail: formState.inputs.candidateEmail.value,
      candidateContact: formState.inputs.candidateContact.value,
    };

    try {
      const res = await props.addCandidateES(executiveCandidate);
      console.log(res);
      setDisplayData((prevState) => [...prevState, CandidateState]);
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteHandler = async (event, id, name) => {
    event.preventDefault();
    const deleteCandidate = {
      token: props.admin.token,
      orderId: orderid,
      candidateESId: id,
    };
    try {
      const res = await props.deleteCandidateES(deleteCandidate);
      setDisplayData(displayData.filter((fil) => fil.candidateName !== name));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const token = props.admin.token;
    if (token) {
      const dataES = {
        token: token,
        orderId: orderid,
      };

      getOrderInvoice(dataES)
        .then((res) => {
          console.log(res);
          setDataES(res.order);
          setDisplayData(res.order.candidates);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [getOrderInvoice, orderid, props.admin]);

  const candidateStatusHandler = async (dataInput) => {
    setStatusIndex(dataInput.i);
    const updatedStatus = {
      token: props.admin.token,
      applicantId: dataInput.applicantId,
      orderId: orderid,
      status: dataInput.value,
      index: dataInput.i,
    };
    try {
      await props.updateCandidateStatusES(updatedStatus);

      setDisplayData((prevData) => {
        const tempData = [...prevData];
        tempData[dataInput.i].status = dataInput.value;
        return tempData;
      });

      setStatusIndex(null);
    } catch (err) {
      console.log(err);
      setStatusIndex(null);
    }
  };

  const updateNoteES = async (note) => {
    const updatedNote = {
      token: props.admin.token,
      applicantId: note.applicantId,
      orderId: orderid,
      note: formState.inputs.note.value,
      index: note.i,
    };
    try {
      await props.updateCandidateStatusES(updatedNote);
      setReply(false);
    } catch (err) {
      console.log(err);
    }
  };

  const replyHandler = (i) => {
    setReply(true);
    setReplyIndex(i);
  };

  let content = <SpinnerCircle />;

  // if (!props.isLoading && data.length < 1) {
  //   content = <h1>tidak ada order untuk saat ini</h1>;
  // }

  if (!props.isLoading && dataES && displayData) {
    content = (
      <div className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <div className={classes.PageContainer}>
            <div className={classes.PageHeader}>
              <p>{dataES.companyName}</p>
            </div>

            <div className={classes.DetailContainer}>
              <div className={classes.DescHolder}>
                <p className={classes.DescLabel}>Nama Pelanggan</p>
                <p>{dataES.name}</p>
              </div>

              <div className={classes.DescHolder}>
                <p className={classes.DescLabel}>Email</p>
                <p>{dataES.email}</p>
              </div>

              <div className={classes.DescHolder}>
                <p className={classes.DescLabel}>Nomor Telepon</p>
                <p>{dataES.phone}</p>
              </div>

              <div className={classes.DescHolder}>
                <p className={classes.DescLabel}>Industri Perusahaan</p>
                <p>{dataES.industry}</p>
              </div>

              <div className={classes.DescHolder}>
                <p className={classes.DescLabel}>Persyaratan Minimum</p>
                <p>
                  {dataES.candidateRequirement
                    ? dataES.candidateRequirement
                    : 'Kosong'}
                </p>
              </div>

              <div className={classes.DescHolder}>
                <p className={classes.DescLabel}>Persyaratan tambahan</p>
                <p>
                  {dataES.specialRequirement
                    ? dataES.specialRequirement
                    : 'Kosong'}
                </p>
              </div>
            </div>
          </div>
          <div className={classes.InputContainer}>
            <form className={classes.InputField}>
              <div className={classes.CandidateInput}>
                <TextField
                  label='nama kandidat'
                  id='candidateName'
                  name='candidateName'
                  size='small'
                  onChange={(event) =>
                    onManualHandler(event, {
                      validator: [VALIDATOR_REQUIRE()],
                    })
                  }
                  style={{ width: '100%' }}
                  inputProps={{
                    style: {
                      fontSize: '0.8rem',
                    },
                  }}
                />
              </div>

              <div className={classes.CandidateInput}>
                <TextField
                  label='email'
                  id='candidateEmail'
                  name='candidateEmail'
                  size='small'
                  onChange={(event) =>
                    onManualHandler(event, {
                      validator: [VALIDATOR_REQUIRE()],
                    })
                  }
                  style={{ width: '100%' }}
                  inputProps={{
                    style: {
                      fontSize: '0.8rem',
                    },
                  }}
                />
              </div>

              <div className={classes.CandidateInput}>
                <TextField
                  label='No.HP'
                  id='candidateContact'
                  name='candidateContact'
                  size='small'
                  onChange={(event) =>
                    onManualHandler(event, {
                      validator: [VALIDATOR_REQUIRE()],
                    })
                  }
                  style={{ width: '100%' }}
                  inputProps={{
                    style: {
                      fontSize: '0.8rem',
                    },
                  }}
                />
              </div>

              <div className={classes.Button}>
                <Button
                  variant='outlined'
                  color='primary'
                  style={{ height: '2rem' }}
                  className={classes.AddButton}
                  onClick={onSubmitHandler}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </div>
            </form>
            <div className={classes.CadidateContainer}>
              {displayData.map((can, i) => {
                return (
                  <div className={classes.CandidateCard} key={i}>
                    <div className={classes.CandidateHead}>
                      <div className={classes.DeleteCandidate}>
                        <button
                          onClick={(e) =>
                            onDeleteHandler(e, can.id, can.candidateName)
                          }
                          style={{
                            border: 'none',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            margin: '0.2rem 0.5rem -0.2rem 0',
                            padding: '0',
                            cursor: 'pointer',
                          }}
                        >
                          <CloseIcon
                            style={{
                              color: 'gray',
                              fontSize: '1rem',
                              margin: '0',
                            }}
                          />
                        </button>
                        <p>{can.candidateName}</p>
                      </div>
                      <div className={classes.DropDown}>
                        {props.indexIsLoading && statusIndex === i ? (
                          <SpinnerCircle />
                        ) : (
                          <p
                            style={
                              can.status === 'Open'
                                ? { color: 'green' }
                                : { color: 'gray' }
                            }
                          >
                            {can.status}
                          </p>
                        )}
                        <button className={classes.DropButton}>
                          <ArrowDropDownIcon />
                        </button>
                        <div className={classes.DropDownContent}>
                          <button
                            style={{ color: 'Green' }}
                            onClick={() =>
                              candidateStatusHandler({
                                applicantId: can.id,
                                value: 'Open',
                                i,
                              })
                            }
                          >
                            Open
                          </button>
                          <button
                            style={{ color: 'red' }}
                            onClick={() =>
                              candidateStatusHandler({
                                applicantId: can.id,
                                value: 'Closed',
                                i,
                              })
                            }
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className={classes.CandidateBody}>
                      <div className={classes.CandidateContact}>
                        <p>{can.candidateEmail}</p>
                        <p>{can.candidateContact}</p>
                      </div>
                      {reply && replyIndex === i ? (
                        <div className={classes.ReplyInput}>
                          <TextField
                            name='note'
                            id='note'
                            label='catatan'
                            multiline
                            rowsMax={4}
                            variant='outlined'
                            size='small'
                            defaultValue={can.note}
                            inputProps={{
                              style: {
                                fontSize: '0.8rem',
                              },
                            }}
                            style={{
                              marginBottom: '0.5rem',
                              width: '25rem',
                              marginRight: '0.5rem',
                            }}
                            onChange={(event) =>
                              onManualHandler(event, {
                                validator: [VALIDATOR_REQUIRE()],
                              })
                            }
                          />
                          <Button
                            color='primary'
                            style={{ height: '2.5rem' }}
                            className={classes.button}
                            onClick={() =>
                              updateNoteES({
                                applicantId: can.id,
                                i,
                              })
                            }
                          >
                            save
                          </Button>
                        </div>
                      ) : (
                        <div className={classes.CandidateNote}>
                          <p className={classes.NoteText}>{can.note}</p>
                          <Button
                            color='primary'
                            style={{ height: '2.5rem' }}
                            className={classes.button}
                            onClick={(e) => replyHandler(i)}
                          >
                            reply
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    indexIsLoading: state.finance.indexIsLoading,
    isLoading: state.finance.isLoading,
    error: state.finance.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderInvoice: (data) => dispatch(actionCreators.getOrderInvoice(data)),
    addCandidateES: (data) => dispatch(actionCreators.addCandidateES(data)),
    deleteCandidateES: (data) =>
      dispatch(actionCreators.deleteCandidateES(data)),
    updateCandidateStatusES: (data) =>
      dispatch(actionCreators.updateCandidateStatusES(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailES);
