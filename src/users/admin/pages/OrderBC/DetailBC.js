import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "../../../../shared/utils/useForm";
import moment from "moment";

import * as actionCreators from "../../../../store/actions/index";
import { VALIDATOR_ALWAYSTRUE } from "../../../../shared/utils/validator";
import Input from "../../../../shared/UI_Element/Input";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import classes from "./DetailBC.module.css";


const DetailBC = props => {
	const { orderid } = useParams();

  const [genderFilter, setGenderFilter] = useState([]);
  const [educationFilter, setEducationFilter] = useState([]);
  // const [ageFilter, setAgeFilter] = useState([]);
  const [shiftFilter, setShiftFilter] = useState(null);
  const [locationFilter, setLocationFilter] = useState(null);
  const [displayData, setDisplayData] = useState();


	const [ dataBC, setDataBC ] = useState();
	const [ dataApplicant, setDataApplicant ] = useState();

  const [formState, onInputHandler] = useForm(
    {
      min: {
        value: "",
        isValid: true,
      },
      max: {
        value: "",
        isValid: true,
      },
    },
    true
  );

  const { getOrderInvoice, getAllApplicant } = props;


	useEffect(
		() => {
			const token = props.admin.token;
			if (token) {
				const dataBC = {
					token: token,
					orderId: orderid
				};

				getOrderInvoice(dataBC)
					.then(res => {
						console.log(res);
						setDataBC(res.order);
					})
					.catch(err => {
						console.log(err);
					});

				getAllApplicant(dataBC)
					.then(res => {
						console.log(res);
						setDataApplicant(res.wholeApplicants);
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		[ getOrderInvoice, getAllApplicant, orderid, props.admin ]
	);


  useEffect(() => {
    if (dataApplicant && dataApplicant.length > 0) {
      let filteredArray = [...dataApplicant];

      if (genderFilter && genderFilter.length > 0) {
        filteredArray = filteredArray.filter((el) => {
          return el.gender === genderFilter[0] || el.gender === genderFilter[1];
        });
      }

      if (educationFilter && educationFilter.length > 0) {
        filteredArray = filteredArray.filter((el) => {
          return el.education.some((edu) => {
            return educationFilter.some((fil) => fil === edu.degree);
          });
        });
      }
      if (formState.inputs.min.value > 0) {
        filteredArray = filteredArray.filter((el) => {
          let tempAge = moment().diff(moment(el.dateOfBirth), "year");
          console.log(tempAge);
          return tempAge >= formState.inputs.min.value;
        });
      }

      if (formState.inputs.max.value > 0) {
        filteredArray = filteredArray.filter((el) => {
          let tempAge = moment().diff(moment(el.dateOfBirth), "year");
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
      setDisplayData(filteredArray);
    }
  }, [
    dataApplicant,
    genderFilter,
    educationFilter,
    locationFilter,
    shiftFilter,
    formState,
  ]);
  console.log(educationFilter);
  //================= Gender Filter ===========================
  const onMaleHandler = (e) => {
    setGenderFilter((prevState) => {
      let tempArray = [...prevState];
      tempArray[0] = e.target.checked ? e.target.value : null;
      if (tempArray[0] === null) {
        tempArray.splice(0, 1);
      }
      return tempArray;
    });
  };
  const onFemaleHandler = (e) => {
    setGenderFilter((prevState) => {
      let tempArray = [...prevState];
      tempArray[1] = e.target.checked ? e.target.value : null;
      if (tempArray[1] === null) {
        tempArray.splice(1, 1);
        if (tempArray[0] === undefined) {
          tempArray.splice(0, 2);
        }
      }

      return tempArray;
    });
  };
  //================= Education Filter ===========================
  const onSMKHandler = (e) => {
    setEducationFilter((prevState) => {
      let tempArray = [...prevState];
      tempArray[0] = e.target.checked ? e.target.value : null;
      if (tempArray[0] === null) {
        tempArray.splice(0, 1);
      }
      return tempArray;
    });
  };
  const onSMAHandler = (e) => {
    setEducationFilter((prevState) => {
      let tempArray = [...prevState];
      tempArray[1] = e.target.checked ? e.target.value : null;
      if (tempArray[1] === null) {
        tempArray.splice(1, 1);
        if (tempArray[0] === undefined) {
          tempArray.splice(0, 2);
        }
      }
      return tempArray;
    });
  };

  const onD3Handler = (e) => {
    setEducationFilter((prevState) => {
      let tempArray = [...prevState];
      tempArray[2] = e.target.checked ? e.target.value : null;
      if (tempArray[2] === null) {
        tempArray.splice(2, 1);
        if (tempArray[1] === undefined) {
          tempArray.splice(1, 2);
          if (tempArray[0] === undefined) {
            tempArray.splice(0, 3);
          }
        }
      }
      return tempArray;
    });
  };

  const onS1Handler = (e) => {
    setEducationFilter((prevState) => {
      let tempArray = [...prevState];
      tempArray[3] = e.target.checked ? e.target.value : null;
      if (tempArray[3] === null) {
        tempArray.splice(3, 1);
        if (tempArray[2] === undefined) {
          tempArray.splice(2, 2);
          if (tempArray[1] === undefined) {
            tempArray.splice(1, 3);
            if (tempArray[0] === undefined) {
              tempArray.splice(0, 4);
            }
          }
        }
      }
      return tempArray;
    });
  };
  const onS2Handler = (e) => {
    setEducationFilter((prevState) => {
      let tempArray = [...prevState];
      tempArray[4] = e.target.checked ? e.target.value : null;
      if (tempArray[4] === null) {
        tempArray.splice(4, 1);
        if (tempArray[3] === undefined) {
          tempArray.splice(3, 2);
          if (tempArray[2] === undefined) {
            tempArray.splice(2, 3);
            if (tempArray[1] === undefined) {
              tempArray.splice(1, 4);
              if (tempArray[0] === undefined) {
                tempArray.splice(0, 5);
              }
            }
          }
        }
      }
      return tempArray;
    });
  };
  const onS3Handler = (e) => {
    setEducationFilter((prevState) => {
      let tempArray = [...prevState];
      tempArray[5] = e.target.checked ? e.target.value : null;
      if (tempArray[5] === null) {
        tempArray.splice(5, 1);
        if (tempArray[4] === undefined) {
          tempArray.splice(4, 2);
          if (tempArray[3] === undefined) {
            tempArray.splice(3, 3);
            if (tempArray[2] === undefined) {
              tempArray.splice(2, 4);
              if (tempArray[1] === undefined) {
                tempArray.splice(1, 5);
                if (tempArray[0] === undefined) {
                  tempArray.splice(0, 6);
                }
              }
            }
          }
        }
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
  let content = <SpinnerCircle />;


	// if (!props.isLoading && data.length < 1) {
	//   content = <h1>tidak ada order untuk saat ini</h1>;
	// }


  if (!props.isLoading && displayData && dataBC) {
    content = (
      <div className={classes.Container}>
        <div className={classes.FilterContainer}>
          <div className={classes.CheckboxCriteria}>
            <p className={classes.FilterLabel}>gender</p>
            <div className={classes.CheckboxHolder}>
              <Checkbox
                color="primary"
                size="small"
                value="pria"
                id="pria"
                onChange={onMaleHandler}
              />
              <p>Pria</p>
            </div>
            <div className={classes.CheckboxHolder}>
              <Checkbox
                color="primary"
                size="small"
                value="wanita"
                id="wanita"
                onChange={onFemaleHandler}
              />
              <p>Wanita</p>
            </div>
          </div>

          <div className={classes.CheckboxCriteria}>
            <p className={classes.FilterLabel}>pendidikan</p>
            <div className={classes.FlexWrap}>
              <div className={classes.CheckboxHolder}>
                <Checkbox
                  color="primary"
                  size="small"
                  id="SMK"
                  value="SMK"
                  onChange={onSMKHandler}
                />
                <p>SMK</p>
              </div>
              <div className={classes.CheckboxHolder}>
                <Checkbox
                  color="primary"
                  size="small"
                  id="SMA"
                  value="SMA"
                  onChange={onSMAHandler}
                />
                <p>SMA</p>
              </div>
              <div className={classes.CheckboxHolder}>
                <Checkbox
                  color="primary"
                  size="small"
                  id="D3"
                  value="D3"
                  onChange={onD3Handler}
                />
                <p>D3</p>
              </div>
              <div className={classes.CheckboxHolder}>
                <Checkbox
                  color="primary"
                  size="small"
                  id="S1"
                  value="S1"
                  onChange={onS1Handler}
                />
                <p>S1</p>
              </div>
              <div className={classes.CheckboxHolder}>
                <Checkbox
                  color="primary"
                  size="small"
                  id="S2"
                  value="S2"
                  onChange={onS2Handler}
                />
                <p>S2</p>
              </div>
              <div className={classes.CheckboxHolder}>
                <Checkbox
                  color="primary"
                  size="small"
                  id="S3"
                  value="S3"
                  onChange={onS3Handler}
                />
                <p>S3</p>
              </div>
            </div>
          </div>

          <div className={classes.CheckboxCriteria}>
            <p className={classes.FilterLabel}>umur</p>
            <div className={classes.InputHolder}>
              <Input
                inputType="number"
                id="min"
                inputClass="Age"
                validatorMethod={[VALIDATOR_ALWAYSTRUE]}
                onInputHandler={onInputHandler}
                type="number"
                initValue="0"
                min="0"
                step="1"
              />
              <p>Min</p>
            </div>
            <div className={classes.InputHolder}>
              <Input
                inputType="number"
                id="max"
                inputClass="Age"
                validatorMethod={[VALIDATOR_ALWAYSTRUE]}
                onInputHandler={onInputHandler}
                type="number"
                initValue="0"
                min="0"
                step="1"
              />
              <p>Max</p>
            </div>
          </div>

          <div className={classes.CheckboxCriteria}>
            <p className={classes.FilterLabel}>ketersediaan</p>
            <div className={classes.CheckboxHolder}>
              <Checkbox
                color="primary"
                size="small"
                id="location"
                value="location"
                onChange={onLocationHandler}
              />
              <p>Luar kota</p>
            </div>
            <div className={classes.CheckboxHolder}>
              <Checkbox
                color="primary"
                size="small"
                id="shift"
                value="shift"
                onChange={onShiftHandler}
              />
              <p>Bekerja shift</p>
            </div>
          </div>
        </div>
        <div className={classes.OrderContainer}>
          <div className={classes.CriteriaContainer}>
            <div className={classes.CriteriaTop}>
              <div className={classes.CriteriaHeader}>
                <p>Criteria </p>
              </div>
              <div className={classes.CriteriaHolder}>
                <p>posisi </p>
                <p className={classes.CriteriaRight}>{dataBC.jobFunction}</p>
              </div>
              <div className={classes.CriteriaHolder}>
                <p>gender </p>
                <p className={classes.CriteriaRight}>{dataBC.gender}</p>
              </div>
              <div className={classes.CriteriaHolder}>
                <p>pendidikan </p>
                <p className={classes.CriteriaRight}>{dataBC.education}</p>
              </div>
              <div className={classes.CriteriaHolder}>
                <p>umur</p>
                <p className={classes.CriteriaRight}>
                  {dataBC.age.min} - {dataBC.age.max}
                </p>
              </div>
            </div>
            <p>
              ditempatkan di kota lain
              {dataBC.location ? (
                <CheckCircleOutlineIcon
                  style={{
                    color: "#90ee90",
                    margin: "0 0.4rem -0.4rem 0.5rem",
                  }}
                />
              ) : (
                <HighlightOffIcon
                  style={{
                    color: "#D41E21",
                    margin: "0 0.4rem -0.4rem 0.5rem",
                  }}
                />
              )}
            </p>
            <p>
              bekerja secara shift
              {dataBC.location ? (
                <CheckCircleOutlineIcon
                  style={{
                    color: "#90ee90",
                    margin: "0 0.5rem -0.4rem 0.5rem",
                  }}
                />
              ) : (
                <HighlightOffIcon
                  style={{
                    color: "#D41E21",
                    margin: "0 0.5rem -0.4rem 0.5rem",
                  }}
                />
              )}
            </p>
            <p>Catatan: {dataBC.note}</p>
            <div className={classes.CriteriaFooter}>
              <p className={classes.CriteriaRight}>
                {dataBC.companyId.companyName}
              </p>
              <p className={classes.CriteriaRight}>
                {dataBC.companyId.emailRecipient}
              </p>
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
                      <th style={app.dateOfBirth ? null : { color: "gray" }}>
                        {app.dateOfBirth
                          ? moment().diff(moment(app.dateOfBirth), "year")
                          : "null"}
                      </th>
                      <th>
                        {app.outOfTown ? (
                          <CheckCircleOutlineIcon
                            style={{
                              color: "#90ee90",
                              margin: "0 0.5rem -0.4rem 0.5rem",
                            }}
                          />
                        ) : (
                          <HighlightOffIcon
                            style={{
                              color: "#D41E21",
                              margin: "0 0.5rem -0.4rem 0.5rem",
                            }}
                          />
                        )}
                      </th>
                      <th>
                        {app.workShifts ? (
                          <CheckCircleOutlineIcon
                            style={{
                              color: "#90ee90",
                              margin: "0 0.5rem -0.4rem 0.5rem",
                            }}
                          />
                        ) : (
                          <HighlightOffIcon
                            style={{
                              color: "#D41E21",
                              margin: "0 0.5rem -0.4rem 0.5rem",
                            }}
                          />
                        )}
                      </th>
                      <th>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          size="small"
                          endIcon={<SendIcon />}
                        >
                          Send
                        </Button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }


	return <div>{content}</div>;
};

const mapStateToProps = state => {
	return {
		admin: state.admin,
		isLoading: state.finance.isLoading,
		error: state.finance.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getOrderInvoice: data => dispatch(actionCreators.getOrderInvoice(data)),
		getAllApplicant: token => dispatch(actionCreators.getAllApplicant(token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailBC);
