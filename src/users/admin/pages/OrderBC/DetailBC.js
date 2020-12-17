import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

import * as actionCreators from "../../../../store/actions/index";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import classes from "./DetailBC.module.css";

const DetailBC = (props) => {
  const { orderid } = useParams();

  const [genderFilter, setGenderFilter] = useState([]);
  const [educationFilter, setEducationFilter] = useState(null);
  const [ageFilter, setAgeFilter] = useState(null);
  const [shiftFilter, setShitFilter] = useState(null);
  const [locationFilter, setLocationFilter] = useState(null);
  const [displayData, setDisplayData] = useState();

  const [dataBC, setDataBC] = useState();
  const [dataApplicant, setDataApplicant] = useState();

  const { getOrderInvoice, getAllApplicant } = props;

  useEffect(() => {
    const token = props.admin.token;
    if (token) {
      const dataBC = {
        token: token,
        orderId: orderid,
      };

      getOrderInvoice(dataBC)
        .then((res) => {
          console.log(res);
          setDataBC(res.order);
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
  }, [getOrderInvoice, getAllApplicant, orderid, props.admin]);

  useEffect(() => {
    if (dataApplicant && dataApplicant.length > 0) {
      let filteredArray = [...dataApplicant];
      if (genderFilter && genderFilter.length > 0) {
        filteredArray = filteredArray.filter((el) => {
          return el.gender === genderFilter[0] || el.gender === genderFilter[1];
        });
      }
      console.log(filteredArray);
    }
  }, [dataApplicant, genderFilter]);

  console.log(genderFilter);
  const onMaleHandler = (e) => {
    setGenderFilter((prevState) => {
      let tempArray = [...prevState];

      tempArray[0] = e.target.checked ? "pria" : null;

      return tempArray;
    });
  };
  const onFemaleHandler = (e) => {
    setGenderFilter((prevState) => {
      let tempArray = [...prevState];
      tempArray[1] = e.target.checked ? e.target.value : null;
      return tempArray;
    });
  };

  let content = <SpinnerCircle />;

  // if (!props.isLoading && data.length < 1) {
  //   content = <h1>tidak ada order untuk saat ini</h1>;
  // }

  if (!props.isLoading && dataBC && dataApplicant) {
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
                onChange={onMaleHandler}
              />
              <p>Pria</p>
            </div>
            <div className={classes.CheckboxHolder}>
              <Checkbox
                color="primary"
                size="small"
                value="wanita"
                onChange={onFemaleHandler}
              />
              <p>Wanita</p>
            </div>
          </div>

          <div className={classes.CheckboxCriteria}>
            <p className={classes.FilterLabel}>pendidikan</p>
            <div className={classes.FlexWrap}>
              <div className={classes.CheckboxHolder}>
                <Checkbox color="primary" size="small" />
                <p>SMK</p>
              </div>
              <div className={classes.CheckboxHolder}>
                <Checkbox color="primary" size="small" />
                <p>SMA</p>
              </div>
              <div className={classes.CheckboxHolder}>
                <Checkbox color="primary" size="small" />
                <p>D3</p>
              </div>
              <div className={classes.CheckboxHolder}>
                <Checkbox color="primary" size="small" />
                <p>S1</p>
              </div>
              <div className={classes.CheckboxHolder}>
                <Checkbox color="primary" size="small" />
                <p>S2</p>
              </div>
              <div className={classes.CheckboxHolder}>
                <Checkbox color="primary" size="small" />
                <p>S3</p>
              </div>
            </div>
          </div>

          <div className={classes.CheckboxCriteria}>
            <p className={classes.FilterLabel}>umur</p>
            <div className={classes.CheckboxHolder}>
              <Checkbox color="primary" size="small" />
              <p>Pria</p>
            </div>
            <div className={classes.CheckboxHolder}>
              <Checkbox color="primary" size="small" />
              <p>Wanita</p>
            </div>
          </div>

          <div className={classes.CheckboxCriteria}>
            <p className={classes.FilterLabel}>ketersediaan</p>
            <div className={classes.CheckboxHolder}>
              <Checkbox color="primary" size="small" />
              <p>Luar kota</p>
            </div>
            <div className={classes.CheckboxHolder}>
              <Checkbox color="primary" size="small" />
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
                {dataApplicant.map((app, i) => {
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

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    isLoading: state.finance.isLoading,
    error: state.finance.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderInvoice: (data) => dispatch(actionCreators.getOrderInvoice(data)),
    getAllApplicant: (token) => dispatch(actionCreators.getAllApplicant(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailBC);
