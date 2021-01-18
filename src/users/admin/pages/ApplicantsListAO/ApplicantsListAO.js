import React, { useState, useCallback, useReducer, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actionCreators from "../../../../store/actions/index";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import QueryBar from "./Component/QueryBar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import classes from "./ApplicantListAO.module.css";

const ACTION = {
  SEARCHUPDATE: "update-search",
  SEARCHEXECUTE: "search-execute",
  SEARCHEMPTY: "search-empty",
  DATAINIT: "data-init",
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case ACTION.SEARCHUPDATE: {
      return {
        ...state,
        search: {
          ...state.search,
          id: action.payload.id,
          value: action.payload.value,
          isValid: action.payload.isValid,
        },
      };
    }

    case ACTION.DATAINIT: {
      return {
        ...state,
        applicantList: action.payload.init,
      };
    }

    case ACTION.SEARCHEXECUTE: {
      const filteredApplicant = action.payload.applicant.filter((app, i) => {
        let searchValidity = false;
        for (const key in app) {
          searchValidity =
            searchValidity ||
            (typeof app[key] === "string" &&
              app[key]
                .toLowerCase()
                .includes(state.search.value.toLowerCase()));

          let eduValidity = false;
          app.education.forEach((edu) => {
            for (const key in edu) {
              eduValidity =
                eduValidity ||
                (typeof edu[key] === "string" &&
                  edu[key]
                    .toLowerCase()
                    .includes(state.search.value.toLowerCase()));
            }
          });
          searchValidity = searchValidity || eduValidity;

          let expValidity = false;
          app.experience.forEach((exp) => {
            for (const key in exp) {
              expValidity =
                expValidity ||
                (typeof exp[key] === "string" &&
                  exp[key]
                    .toLowerCase()
                    .includes(state.search.value.toLowerCase()));
            }
          });
          searchValidity = searchValidity || expValidity;

          let skillValidity = false;
          app.skills.forEach((skill) => {
            skillValidity =
              skillValidity ||
              (typeof skill === "string" &&
                skill.toLowerCase().includes(state.search.value.toLowerCase()));
          });
          searchValidity = searchValidity || skillValidity;
        }

        return searchValidity;
      });
      console.log(filteredApplicant);
      return {
        ...state,
        applicantList: filteredApplicant,
      };
    }
    case ACTION.SEARCHEMPTY: {
      return {
        ...state,
        applicantList: action.payload.applicant,
      };
    }
    default: {
      return state;
    }
  }
};

const ApplicantListAO = (props) => {
  const [find, setfind] = useState(false);
  const [filter, setfilter] = useState({ value: "" });
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [state, dispatch] = useReducer(searchReducer, {
    search: {
      id: "",
      value: "",
      isValid: "",
    },
    applicantList: [],
  });

  const { getAllApplicant, admin } = props;
  useEffect(() => {
    const payload = { token: admin.token };
    getAllApplicant(payload).then((res) => {
      setData(res.wholeApplicants);
      dispatch({
        type: ACTION.DATAINIT,
        payload: { init: res.wholeApplicants },
      });
      setIsLoading(false);
    });
  }, [getAllApplicant, setIsLoading, admin.token]);

  const handleAll = () => {
    setfind(false);
  };

  const handleBlocked = () => {
    setfind(true);
    setfilter("Blocked");
  };

  const handleRegular = () => {
    setfind(true);
    setfilter("Regular");
  };

  const handlePremium = () => {
    setfind(true);
    setfilter("Premium");
  };

  const searchHandler = (event) => {
    event.preventDefault();
    if (state.search.value) {
      dispatch({
        type: ACTION.SEARCHEXECUTE,
        payload: { applicant: data },
      });
    } else {
      dispatch({
        type: ACTION.SEARCHEMPTY,
        payload: { applicant: data },
      });
    }
  };

  const searchInputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: ACTION.SEARCHUPDATE,
      payload: {
        id,
        value,
        isValid,
      },
    });
  }, []);

  let content = <SpinnerCircle />;

  if (!isLoading) {
    content = (
      <div className={classes.FlexContainer}>
        <QueryBar
          searchInputHandler={searchInputHandler}
          searchHandler={searchHandler}
          action={`/AO/applicantlist`}
        />

        <div className={classes.Container}>
          <div className={classes.HeaderContainer}>
            <h1 className={classes.Header}>Applicant Account List</h1>
            <div className={classes.DropDown}>
              <button className={classes.DropButton}>
                Filter
                <ArrowDropDownIcon />
              </button>
              <div className={classes.DropDownContent}>
                <button style={{ color: "black" }} onClick={handleAll}>
                  All
                </button>
                <button
                  style={{ color: "rgb(33, 153, 0)" }}
                  value="Blocked"
                  onClick={handleBlocked}
                >
                  Blocked
                </button>
                <button
                  style={{ color: "red" }}
                  value="Regular"
                  onClick={handleRegular}
                >
                  Regular
                </button>

                <button
                  style={{ color: "rgb(250, 129, 0)" }}
                  value="Premium"
                  onClick={handlePremium}
                >
                  Premium
                </button>
              </div>
            </div>
          </div>
          <table className={classes.Table}>
            <thead className={classes.RowField}>
              <tr>
                <th>Id</th>
                <th>Applicant Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            {find ? (
              <tbody className={classes.ColumnField}>
                {state.applicantList &&
                  state.applicantList
                    .filter((app) => app.status === filter)
                    .map((app) => (
                      <tr key={app.id}>
                        <th>
                          <Link
                            to={`/ap/${app.id}`}
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            {app.id}
                          </Link>
                        </th>

                        <th>
                          <div className={classes.NameRow}>
                            <div className={classes.ApplicantName}>
                              {app.firstName} {app.lastName}
                            </div>
                            <p />
                            {app.headline}
                          </div>
                        </th>
                        <th>{app.email}</th>
                        <th
                          style={
                            app.address
                              ? { color: "black" }
                              : { color: "rgba(255,0,0,0.7)" }
                          }
                        >
                          {app.address ? app.address : "no data"}
                        </th>

                        <th>
                          <div className={classes.DropDown}>
                            <button className={classes.DropButton}>
                              <ArrowDropDownIcon />
                            </button>
                            <div className={classes.DropDownContent}>
                              <button style={{ color: "Green" }}>
                                Activate
                              </button>
                              <button style={{ color: "red" }}>Block</button>
                            </div>
                          </div>
                        </th>
                      </tr>
                    ))}
              </tbody>
            ) : (
              <tbody className={classes.ColumnField}>
                {state.applicantList &&
                  state.applicantList.map((app) => (
                    <tr key={app.id}>
                      <th>
                        {" "}
                        <Link
                          to={`/ap/${app.id}`}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          {app.id}
                        </Link>
                      </th>

                      <th>
                        <div className={classes.NameRow}>
                          <div className={classes.ApplicantName}>
                            {app.firstName} {app.lastName}
                          </div>
                          <p />
                          {app.headline ? app.headline : "No info"}
                        </div>
                      </th>
                      <th>{app.email}</th>
                      <th
                        style={
                          app.address
                            ? { color: "black" }
                            : { color: "rgba(255,0,0,0.7)" }
                        }
                      >
                        {app.address ? app.address : "no data"}
                      </th>
                      <th
                        style={
                          app.status
                            ? { color: "green", fontWeight: "600" }
                            : { color: "red", fontWeight: "600" }
                        }
                      >
                        {app.status ? "Active" : "Blocked"}
                      </th>
                      <th>
                        <div className={classes.DropDown}>
                          <button className={classes.DropButton}>
                            <ArrowDropDownIcon />
                          </button>
                          <div className={classes.DropDownContent}>
                            <button style={{ color: "Green" }}>Activate</button>
                            <button style={{ color: "red" }}>Block</button>
                          </div>
                        </div>
                      </th>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    );
  }
  return <div>{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllApplicant: (payload) =>
      dispatch(actionCreators.getAllApplicant(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ApplicantListAO);
