import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { useForm } from "../../../../../shared/utils/useForm";
import moment from "moment";

import * as actionTypes from "../../../../../store/actions/actions";
import * as actionCreators from "../../../../../store/actions/index";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_ALWAYSTRUE,
} from "../../../../../shared/utils/validator";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Modal from "../../../../../shared/UI_Element/Modal";
import SpinnerCircle from "../../../../../shared/UI_Element/Spinner/SpinnerCircle";
import Input from "../../../../../shared/UI_Element/Input";
import Button from "@material-ui/core/Button";

import classes from "./Education.module.css";

const Education = (props) => {
  const { applicantid } = useParams();
  const push = props.push;

  const [degree, setDegree] = useState("");
  const [open, setOpen] = useState(false);
  const [formState, onInputHandler] = useForm(
    {
      school: {
        value: "",
        isValid: false,
      },
      degree: {
        value: "",
        isValid: false,
      },
      major: {
        value: "",
        isValid: false,
      },
      location: {
        value: "",
        isValid: false,
      },
      startDate: {
        value: "",
        isValid: false,
      },
      endDate: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  console.log(formState.inputs.degree);
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    const updatedEducation = {
      applicantId: applicantid,
      school: formState.inputs.school.value,
      degree: formState.inputs.degree.value,
      major: formState.inputs.major.value,
      location: formState.inputs.location.value,
      startDate: formState.inputs.startDate.value,
      endDate: formState.inputs.endDate.value,
      description: formState.inputs.description.value,
    };
    try {
      const res = await props.updateApplicantEducation(updatedEducation);
      if (res) {
        console.log(res);
      } else {
        console.log("no res detected");
      }
      !push && props.history.push(`/ap/${applicantid}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setDegree(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  let formContent = (
    <div className={classes.ContainerFlex}>
      <p className={classes.FormTitle}>Pendidikan</p>

      <div className={classes.FormRow}>
        <div className={classes.EditLabel}>
          <Input
            inputType="input"
            id="school"
            inputClass="AddJobInput"
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label="School *"
            initIsValid={true}
          />
        </div>

        <FormControl
          className={classes.formControl}
          style={{ margin: "0.8rem 0" }}
        >
          <InputLabel id="degree" style={{ fontSize: "1rem" }}>
            Tingkat Pendidikan
          </InputLabel>

          <Select
            labelId="degree"
            id="degree"
            name="degree"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={degree}
            onChange={handleChange}
            style={{ fontSize: "0.9rem", textAlign: "left" }}
          >
            <MenuItem value={"SMA"} style={{ fontSize: "0.9rem" }}>
              SMA
            </MenuItem>
            <MenuItem value={"SMK"} style={{ fontSize: "0.9rem" }}>
              SMK
            </MenuItem>
            <MenuItem value={"D3"} style={{ fontSize: "0.9rem" }}>
              D3
            </MenuItem>
            <MenuItem value={"S1"} style={{ fontSize: "0.9rem" }}>
              S1
            </MenuItem>
            <MenuItem value={"S2"} style={{ fontSize: "0.9rem" }}>
              S2
            </MenuItem>
            <MenuItem value={"S3"} style={{ fontSize: "0.9rem" }}>
              S3
            </MenuItem>
          </Select>
        </FormControl>

        <div className={classes.EditLabel}>
          <Input
            inputType="input"
            id="major"
            inputClass="AddJobInput"
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label="Bidang Studi *"
            initIsValid={true}
          />
        </div>

        <div className={classes.EditLabel}>
          <Input
            inputType="input"
            id="location"
            inputClass="AddJobInput"
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label="Lokasi *"
            initIsValid={true}
          />
        </div>

        <div className={classes.Period}>
          <div className={classes.EditLabel}>
            <p className={classes.Text}>Tahun Mulai *</p>
            <Input
              inputType="customdate"
              id="startDate"
              validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
              onInputHandler={onInputHandler}
              views={["year"]}
              maxDate={moment()}
              initIsValid={true}
            />
          </div>

          <div className={classes.EditLabel}>
            <p className={classes.Text}>Tahun Selesai *</p>
            <Input
              inputType="customdate"
              id="endDate"
              validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
              onInputHandler={onInputHandler}
              views={["year"]}
              maxDate={moment()}
              initIsValid={true}
            />
          </div>
        </div>

        <div className={classes.EditLabel}>
          <Input
            inputType="textarea"
            id="description"
            inputClass="EditProfileTextArea"
            validatorMethod={[VALIDATOR_MINLENGTH(20)]}
            onInputHandler={onInputHandler}
            label="Deskripsi Pendidikan *"
            initIsValid={true}
            rows={12}
          />
        </div>
      </div>

      <div className={classes.Footer}>
        <Button
          disabled={!formState.formIsValid}
          variant="contained"
          color="primary"
          type="submit"
        >
          Save
        </Button>
      </div>
    </div>
  );

  if (props.isLoading) {
    formContent = <SpinnerCircle />;
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <div style={!push ? { marginTop: "6rem" } : { marginTop: "0" }}>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <Modal show={props.error} onCancel={onCancelHandler}>
          Input requirement not fulfilled
        </Modal>
        {formContent}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.applicant.isLoading,
    error: state.applicant.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    updateApplicantFail: () =>
      dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
    updateApplicantEducation: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantEducation(ApplicantData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Education));
