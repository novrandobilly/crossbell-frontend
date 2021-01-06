import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { useForm } from "../../../../../shared/utils/useForm";

import * as actionTypes from "../../../../../store/actions/actions";
import * as actionCreators from "../../../../../store/actions/index";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_ALWAYSTRUE,
} from "../../../../../shared/utils/validator";

import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Modal from "../../../../../shared/UI_Element/Modal";
import SpinnerCircle from "../../../../../shared/UI_Element/Spinner/SpinnerCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Input from "../../../../../shared/UI_Element/Input";
import WorkFieldData from "../../../../../shared/UI_Element/WorkFieldData";

import classes from "./EditIntro.module.css";

const EditIntro = (props) => {
  const { applicantid } = useParams();

  const [data, setData] = useState();
  const [interest, setInterest] = useState("");
  const [open, setOpen] = useState(false);

  const { getOneApplicant } = props;
  useEffect(() => {
    getOneApplicant(applicantid).then((res) => {
      setData(res.applicant);
      console.log(res.applicant.interest);
    });
  }, [getOneApplicant, applicantid]);

  const [formState, onInputHandler] = useForm(
    {
      picture: {
        value: data ? data.picture : null,
        isValid: true,
      },

      firstName: {
        value: data ? data.firstName : null,
        isValid: data && data.firstName ? true : false,
      },

      lastName: {
        value: data ? data.lastName : null,
        isValid: data && data.lastName ? true : false,
      },

      email: {
        value: data ? data.email : null,
        isValid: data && data.email ? true : false,
      },

      headline: {
        value: data ? data.headline : null,
        isValid: data && data.headline ? true : false,
      },

      dateOfBirth: {
        value: data ? data.dateOfBirth : null,
        isValid: data && data.dateOfBirth ? true : false,
      },

      gender: {
        value: data ? data.gender : null,
        isValid: data && data.gender ? true : false,
      },

      address: {
        value: data ? data.address : null,
        isValid: data && data.address ? true : false,
      },

      city: {
        value: data ? data.city : null,
        isValid: data && data.city ? true : false,
      },

      state: {
        value: data ? data.state : null,
        isValid: data && data.state ? true : false,
      },
      zip: {
        value: data ? data.zip : null,
        isValid: data && data.zip ? true : false,
      },
      phone: {
        value: data ? data.phone : null,
        isValid: data && data.phone ? true : false,
      },
      outOfTown: {
        value: data ? data.outOfTown : false,
        isValid: data && data.outOfTown ? true : false,
      },
      workShifts: {
        value: data ? data.workShifts : false,
        isValid: data && data.workShifts ? true : false,
      },
      autoSend: {
        value: data ? data.autoSend : false,
        isValid: data && data.autoSend ? true : false,
      },
      autoRemind: {
        value: data ? data.autoRemind : false,
        isValid: data && data.autoRemind ? true : false,
      },
      headhunterProgram: {
        value: data ? data.headhunterProgram : false,
        isValid: data && data.headhunterProgram ? true : false,
      },
      interest: {
        value: data ? data.interest : null,
        isValid: true,
      },
    },
    false
  );

  useEffect(() => {
    if (data) {
      const genderEl = document.getElementById(data.gender);
      const outOfTownEl = document.getElementById("outOfTown");
      const workShiftsEl = document.getElementById("workShifts");
      const autoSendEl = document.getElementById("autoSend");
      const autoRemindEl = document.getElementById("autoRemind");
      const headhunterProgramEl = document.getElementById("headhunterProgram");
      if (genderEl) genderEl.checked = true;
      outOfTownEl.checked = data.outOfTown;
      workShiftsEl.checked = data.workShifts;
      autoSendEl.checked = data.autoSend;
      autoRemindEl.checked = data.autoRemind;
      headhunterProgramEl.checked = data.headhunterProgram;
      onInputHandler("gender", data.gender, true);
      onInputHandler("autoSend", data.autoSend, true);
      onInputHandler("outOfTown", data.outOfTown, true);
      onInputHandler("workShifts", data.workShifts, true);
      onInputHandler("autoRemind", data.autoRemind, true);
      onInputHandler("headhunterProgram", data.headhunterProgram, true);
    }
  }, [data, onInputHandler]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    const ApplicantData = {
      applicantId: applicantid,
      picture: formState.inputs.picture.value,
      firstName: formState.inputs.firstName.value,
      lastName: formState.inputs.lastName.value,
      headline: formState.inputs.headline.value,
      dateOfBirth: formState.inputs.dateOfBirth.value,
      gender: formState.inputs.gender.value,
      email: formState.inputs.email.value,
      address: formState.inputs.address.value,
      city: formState.inputs.city.value,
      state: formState.inputs.state.value,
      zip: formState.inputs.zip.value,
      phone: formState.inputs.phone.value,
      outOfTown: formState.inputs.outOfTown.value,
      workShifts: formState.inputs.workShifts.value,
      autoSend: formState.inputs.autoSend.value,
      autoRemind: formState.inputs.autoRemind.value,
      headhunterProgram: formState.inputs.headhunterProgram.value,
      interest: formState.inputs.interest.value,
    };

    try {
      const res = await props.updateApplicantIntro(ApplicantData);
      if (res) {
        // console.log(res);
      }

      props.history.push(`/ap/${applicantid}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setInterest(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onManualInputHandler = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;

    onInputHandler(elementId, elementValue, true);
  };

  const onCheckedInputHandler = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.checked;

    onInputHandler(elementId, elementValue, true);
  };

  const onUploadHandler = (e) => {
    const elementId = e.target.name;
    const elementFile = e.target.files[0];
    onInputHandler(elementId, elementFile, true);
  };

  let formContent = <SpinnerCircle />;

  if (!props.isLoading && data) {
    formContent = (
      <React.Fragment>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>About Me</p>

          <div className={classes.Content}>
            <div className={classes.ProfilePicture}>
              <AccountCircleIcon
                style={{
                  fontSize: "15rem",
                  marginBottom: "1rem",
                }}
              />
              <label className={classes.InputButton}>
                <input
                  type="file"
                  name="picture"
                  id="picture"
                  onChange={onUploadHandler}
                  accept=".jpg, .jpeg, .png"
                />
                <span className={classes.InputButtonText}> Upload File </span>
              </label>
            </div>

            <div className={classes.ContentTop}>
              <div className={classes.ContentLeft}>
                <Input
                  inputType="input"
                  id="firstName"
                  inputClass="AppInput"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label="First Name*"
                  initValue={data.firstName}
                  initIsValid={true}
                />
                <Input
                  inputType="input"
                  id="headline"
                  inputClass="AppInput"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label="Headline*"
                  initValue={data.headline}
                  initIsValid={true}
                />

                <Input
                  inputType="input"
                  id="phone"
                  inputClass="AppInput"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label="Phone*"
                  initValue={data.phone}
                  initIsValid={true}
                />

                <Input
                  inputType="input"
                  id="city"
                  inputClass="AppInput"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label="City*"
                  initValue={data.city}
                  initIsValid={true}
                />

                <Input
                  inputType="input"
                  id="zip"
                  inputClass="AppInput"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label="Zip*"
                  initValue={data.zip}
                  initIsValid={true}
                />

                <p className={classes.Text} style={{ marginBottom: "0.2rem" }}>
                  Tanggal Lahir*
                </p>
                <Input
                  inputType="customdate"
                  id="dateOfBirth"
                  validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                  onInputHandler={onInputHandler}
                  views={["year", "month", "date"]}
                  label="Tanggal Lahir"
                  maxDate={moment()}
                  initValue={data.dateOfBirth}
                  initIsValid={true}
                  format="dd/MM/yyyy"
                />
              </div>

              <div className={classes.ContentRight}>
                <Input
                  inputType="input"
                  id="lastName"
                  inputClass="AppInput"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label="Last Name*"
                  initValue={data.lastName}
                  initIsValid={true}
                />

                <Input
                  inputType="input"
                  id="email"
                  inputClass="AppInput"
                  validatorMethod={[VALIDATOR_EMAIL()]}
                  onInputHandler={onInputHandler}
                  label="Email*"
                  initValue={data.email}
                  initIsValid={true}
                />

                <Input
                  inputType="input"
                  id="address"
                  inputClass="AppInput"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label="Address*"
                  initValue={data.address}
                  initIsValid={true}
                />

                <Input
                  inputType="input"
                  id="state"
                  inputClass="AppInput"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label="State*"
                  initValue={data.state}
                  initIsValid={true}
                />

                <FormControl
                  className={classes.formControl}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                >
                  <InputLabel shrink id="interest">
                    Bidang minat
                  </InputLabel>

                  <Select
                    labelId="interest"
                    id="interest"
                    name="interest"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={data.interest ? data.interest : interest}
                    onChange={handleChange}
                    style={{
                      fontSize: "0.9rem",
                      textAlign: "left",
                      paddingBottom: "0.15rem",
                      color: "black",
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

                <div
                  id="gender"
                  onChange={onManualInputHandler}
                  style={{ marginTop: "1.3rem" }}
                >
                  <p className={classes.Text}>Jenis Kelamin*</p>
                  <div className={classes.RadioHolder}>
                    <label
                      style={{ marginRight: "2rem" }}
                      className={classes.RadioButton}
                    >
                      <input
                        type="radio"
                        value="male"
                        name="gender"
                        id="male"
                      />{" "}
                      Pria
                    </label>
                    <label className={classes.RadioButton}>
                      <input
                        type="radio"
                        value="female"
                        name="gender"
                        id="female"
                      />{" "}
                      Wanita
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.ContentBottom}>
              <label onChange={onCheckedInputHandler}>
                <input id="outOfTown" type="checkbox" name="outOfTown" />{" "}
                Bersedia ditempatkan di luar kota asal
              </label>
              <label onChange={onCheckedInputHandler}>
                <input id="workShifts" type="checkbox" name="workShifts" />{" "}
                Bersedia bekerja dengan sistem shift
              </label>
              <label onChange={onCheckedInputHandler}>
                <input id="autoSend" type="checkbox" name="autoSend" />
                saya bersedia didaftarkan kerja secara otomatis oleh Crossbel
              </label>
              <label onChange={onCheckedInputHandler}>
                <input id="autoRemind" type="checkbox" name="autoRemind" /> saya
                ingin diingatkan bila ada pekerjaan yang cocok dengan minat saya
              </label>
              <label onChange={onCheckedInputHandler}>
                <input
                  id="headhunterProgram"
                  type="checkbox"
                  name="headhunterProgram"
                />{" "}
                saya ingin mengikuti headhunter program Crossbell asal
              </label>
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
      </React.Fragment>
    );
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Could not update changes at the moment, please try again later
      </Modal>
      {formContent}
    </form>
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
    updateApplicantFail: () =>
      dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    getOneApplicant: (data) => dispatch(actionCreators.getOneApplicant(data)),
    updateApplicantIntro: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantIntro(ApplicantData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditIntro));
