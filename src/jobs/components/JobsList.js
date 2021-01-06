import React, { useReducer, useEffect, useState } from "react";
import { useForm } from "../../shared/utils/useForm";
import moment from "moment";

import { VALIDATOR_ALWAYSTRUE } from "../../shared/utils/validator";
import Input from "../../shared/UI_Element/Input";
import Pagination from "@material-ui/lab/Pagination";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import JobCard from "./JobCard";
import WorkFieldData from "../../shared/UI_Element/WorkFieldData";
import LocationData from "../../shared/UI_Element/LocationData";

import classes from "./JobsList.module.css";

const ACTIONPAGE = {
  PAGEUPDATE: "PAGEUPDATE",
};

const initPagination = {
  pageCount: 1,
  pageNumber: 1,
  rowsPerPage: 5,
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

const JobsList = (props) => {
  const totaAvailableJobs = useState(props.items)[0];
  const [displayJobs, setDisplayJobs] = useState([]);
  const [displayData, setDisplayData] = useState();

  const [state, dispatch] = useReducer(paginationReducer, initPagination);
  const [sort, setSort] = useState("newest");
  const [employmentFilter, setEmploymentFilter] = useState([]);

  const [fieldOfWorkFilter, setFieldOfWorkFilter] = useState("");
  const [workOpen, setWorkOpen] = useState(false);

  const [locationFilter, setLocationFilter] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);

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

  useEffect(() => {
    if (totaAvailableJobs && totaAvailableJobs.length > 0) {
      let filteredArray = [...totaAvailableJobs];

      if (employmentFilter && employmentFilter.length > 0) {
        filteredArray = filteredArray.filter((el) => {
          return employmentFilter.some((gen) => gen === el.employment);
        });
      }

      if (fieldOfWorkFilter) {
        filteredArray = filteredArray.filter((app) => {
          return app.fieldOfWork === fieldOfWorkFilter;
        });
      }
      if (locationFilter) {
        filteredArray = filteredArray.filter((el) => {
          return el.placementLocation === locationFilter;
        });
      }

      if (formState.inputs.min.value > 0) {
        filteredArray = filteredArray.filter((el) => {
          let tempSalary = parseInt(el.salary);
          return tempSalary >= formState.inputs.min.value;
        });
      }

      if (formState.inputs.max.value > 0) {
        filteredArray = filteredArray.filter((el) => {
          let tempSalary = parseInt(el.salary);
          return tempSalary <= formState.inputs.max.value;
        });
      }

      setDisplayData(filteredArray);
    }
  }, [
    totaAvailableJobs,
    employmentFilter,
    fieldOfWorkFilter,
    locationFilter,
    formState,
  ]);

  useEffect(() => {
    if (displayData && displayData.length > 0) {
      let filteredJobs = [...displayData].sort((a, b) => {
        if (sort === "newest") {
          return moment(b.createdAt) - moment(a.createdAt);
        }
        if (sort === "latest") {
          return moment(a.createdAt) - moment(b.createdAt);
        }
        if (sort === "highSalary") {
          return b.salary - a.salary;
        }
        if (sort === "lowSalary") {
          return a.salary - b.salary;
        }
        return console.log("changed");
      });

      let pageCount = Math.ceil(filteredJobs.length / state.rowsPerPage);
      dispatch({ type: ACTIONPAGE.PAGEUPDATE, payload: { pageCount } });

      //Slicing all jobs based on the number jobs may appear in one page
      filteredJobs = filteredJobs.slice(
        state.startIndex,
        state.startIndex + state.rowsPerPage
      );

      setDisplayJobs(filteredJobs);
    }
  }, [
    sort,
    displayData,
    state.startIndex,
    state.rowsPerPage,
    state.pageNumber,
  ]);

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

  //================= Sort ===========================

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  //================= Employment Filter ===========================
  const onEmploymentHandler = (e) => {
    setEmploymentFilter((prevState) => {
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
    setLocationFilter(e.target.value);
    console.log(e.target.value);
  };

  const handleLocationClose = () => {
    setLocationOpen(false);
  };

  const handleLocationOpen = () => {
    setLocationOpen(true);
  };
  //=================== Field Of Work Filter ====================================

  const onHandleWork = (e) => {
    setFieldOfWorkFilter(e.target.value);
  };

  const handleWorkClose = () => {
    setWorkOpen(false);
  };

  const handleWorkOpen = () => {
    setWorkOpen(true);
  };

  //================= Element Component ===========================

  let content = (
    <div className={classes.Container}>
      <div className={classes.FilterContainer}>
        <div className={classes.CheckboxCriteria}>
          <p className={classes.FilterLabel}>bidang pekerjaan</p>
          <FormControl
            className={classes.formControl}
            style={{ width: "100%", marginTop: "-0.5rem" }}
          >
            <InputLabel id="fieldOfWorkFilter">pilih</InputLabel>
            <Select
              labelId="fieldOfWorkFilter"
              id="fieldOfWorkFilter"
              name="fieldOfWorkFilter"
              open={workOpen}
              onClose={handleWorkClose}
              onOpen={handleWorkOpen}
              value={fieldOfWorkFilter}
              onChange={onHandleWork}
              style={{
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              <MenuItem value="" style={{ fontSize: "0.9rem" }}>
                <em>Belum ada untuk saat ini</em>
              </MenuItem>
              {WorkFieldData.sort().map((work, i) => {
                return (
                  <MenuItem
                    id={i}
                    value={work}
                    style={{ fontSize: "0.9rem" }}
                    key={i}
                  >
                    {work}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className={classes.CheckboxCriteria}>
          <p className={classes.FilterLabel}>lokasi</p>
          <FormControl
            className={classes.formControl}
            style={{ width: "100%", marginTop: "-0.5rem" }}
          >
            <InputLabel id="locationFilter">pilih</InputLabel>
            <Select
              labelId="locationFilter"
              id="locationFilter"
              name="locationFilter"
              open={locationOpen}
              onClose={handleLocationClose}
              onOpen={handleLocationOpen}
              value={locationFilter}
              onChange={onLocationHandler}
              style={{
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              <MenuItem value="" style={{ fontSize: "0.9rem" }}>
                <em>Belum ada untuk saat ini</em>
              </MenuItem>
              {LocationData.sort().map((loc, i) => {
                return (
                  <MenuItem
                    id={i}
                    value={loc}
                    style={{ fontSize: "0.9rem" }}
                    key={i}
                  >
                    {loc}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className={classes.CheckboxCriteria}>
          <p className={classes.FilterLabel}>level</p>
          <div onChange={onEmploymentHandler}>
            <div className={classes.CheckboxHolder}>
              <Checkbox
                color="primary"
                size="small"
                value="contract"
                id="contract"
              />
              <p>contract</p>
            </div>
            <div className={classes.CheckboxHolder}>
              <Checkbox
                color="primary"
                size="small"
                value="permanent"
                id="permanent"
              />
              <p>permanent</p>
            </div>
            <div className={classes.CheckboxHolder}>
              <Checkbox
                color="primary"
                size="small"
                value="intern"
                id="intern"
              />
              <p>intern</p>
            </div>
          </div>
        </div>

        <div className={classes.CheckboxCriteria}>
          <p className={classes.FilterLabel}>gaji</p>
          <div className={classes.InputHolder}>
            <Input
              inputType="number"
              id="min"
              inputClass="Salary"
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
              inputClass="Salary"
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
      </div>

      <div className={classes.JobList}>
        {displayJobs && displayJobs.length > 0 ? (
          displayJobs.map((job) => (
            <JobCard
              key={job._id}
              jobId={job._id}
              jobTitle={job.jobTitle}
              placementLocation={job.placementLocation}
              company={job.companyId.companyName}
              logo={
                job.logo
                  ? job.logo
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              salary={job.salary}
              emailRecipient={job.companyId.emailRecipient}
              companyId={job.companyId}
            />
          ))
        ) : (
          <h2>Tidak ada pekerjaan sesuai pencarian</h2>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <FormControl style={{ width: "4rem" }}>
            <Select
              labelId="rowPerPage"
              id="rowPerPageSelect"
              value={state.rowsPerPage}
              onChange={rowsHandler}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
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

      <FormControl
        className={classes.formControl}
        style={{ width: "8rem", textAlign: "left" }}
      >
        <InputLabel id="sort">filter</InputLabel>
        <Select labelId="sort" id="sort" value={sort} onChange={handleChange}>
          <MenuItem value="newest">terbaru</MenuItem>
          <MenuItem value="latest">terlawas</MenuItem>
          <MenuItem value="highSalary">gaji tertinggi</MenuItem>
          <MenuItem value="lowSalary">gaji terendah</MenuItem>
        </Select>
      </FormControl>
    </div>
  );

  return <div>{content}</div>;
};

export default JobsList;
