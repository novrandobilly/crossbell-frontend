import React, { useState, useCallback, useReducer } from "react";
import { connect } from "react-redux";

import QueryBar from "./Component/QueryBar";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import classes from "./ApplicantListAO.module.css";

const ACTION = {
  SEARCHUPDATE: "update-search",
  SEARCHEXECUTE: "search-execute",
  SEARCHEMPTY: "search-empty",
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
    case ACTION.SEARCHEXECUTE: {
      const filteredApplicant = action.payload.applicant.filter((app, i) => {
        let searchValidity = false;
        for (const key in app) {
          console.log(app);
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

  const [state, dispatch] = useReducer(searchReducer, {
    search: {
      id: "",
      value: "",
      isValid: "",
    },
    applicantList: props.applicant,
  });
  console.log(state.applicantList);

  const searchHandler = (event) => {
    event.preventDefault();
    if (state.search.value) {
      dispatch({
        type: ACTION.SEARCHEXECUTE,
        payload: { applicant: props.applicant },
      });
    } else {
      dispatch({
        type: ACTION.SEARCHEMPTY,
        payload: { applicant: props.applicant },
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

  if (state.applicantList.length <= 0) {
    return (
      <div className="centerGlobal">
        <h2>No Applicant found!</h2>
      </div>
    );
  }

  return (
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
              <th>Headline</th>
              <th>Email</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {find ? (
            <tbody className={classes.ColumnField}>
              {state.applicantList
                .filter((app) => app.status === filter)
                .map((app) => (
                  <tr key={app.applicantId}>
                    <th>{app.applicantId}</th>
                    <th>
                      {app.firstName} {app.lastName}
                    </th>
                    <th>{app.headline}</th>
                    <th>{app.email}</th>
                    <th>{app.address}</th>
                    <th
                      style={
                        app.status === "Blocked"
                          ? { color: "Red", fontWeight: "bold" }
                          : app.status === "Regular"
                          ? { color: "Green", fontWeight: "bold" }
                          : { color: "Yellow", fontWeight: "bold" }
                      }
                    >
                      {app.status}
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
          ) : (
            <tbody className={classes.ColumnField}>
              {state.applicantList.map((app) => (
                <tr key={app.applicantId}>
                  <th>{app.applicantId}</th>
                  <th>
                    {app.firstName} {app.lastName}
                  </th>
                  <th>{app.headline}</th>
                  <th>{app.email}</th>
                  <th>{app.address}</th>
                  <th
                    style={
                      app.status === "Blocked"
                        ? { color: "Red", fontWeight: "bold" }
                        : app.status === "Regular"
                        ? { color: "Green", fontWeight: "bold" }
                        : { color: "Yellow", fontWeight: "bold" }
                    }
                  >
                    {app.status}
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
};

const mapStateToProps = (state) => {
  return {
    applicant: state.applicant.applicants,
  };
};

export default connect(mapStateToProps)(ApplicantListAO);
