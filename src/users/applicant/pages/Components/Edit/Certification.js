import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { useForm } from "../../../../../shared/utils/useForm";

import * as actionCreators from "../../../../../store/actions/index";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../../../shared/utils/validator";

import SpinnerCircle from "../../../../../shared/UI_Element/Spinner/SpinnerCircle";
import Input from "../../../../../shared/UI_Element/Input";
import SaveButton from "../../../../../shared/UI_Element/SaveButton";

import classes from "./Certification.module.css";

const Certification = (props) => {
  const { applicantid } = useParams();
  const { certificationindex } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { getOneApplicant } = props;
  useEffect(() => {
    getOneApplicant(applicantid).then((res) => {
      setData(res.applicant.certification[certificationindex]);
      setIsLoading(false);
    });
  }, [getOneApplicant, setIsLoading, applicantid, certificationindex]);

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: data.title,
        isValid: true,
      },
      organization: {
        value: data.organization,
        isValid: true,
      },
      startDate: {
        value: data.startDate,
        isValid: true,
      },
      endDate: {
        value: data.endDate,
        isValid: true,
      },
      description: {
        value: data.description,
        isValid: true,
      },
    },
    false
  );

  const [expiry, setExpiry] = useState(false);

  const expiryHandler = (event) => {
    setExpiry(!expiry);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (expiry) {
      const updatedCertification = {
        applicantId: applicantid,
        index: certificationindex,
        title: formState.inputs.title.value,
        organization: formState.inputs.organization.value,
        startDate: formState.inputs.startDate.value,
        endDate: formState.inputs.endDate.value,
        description: formState.inputs.description.value,
      };
      try {
        const res = await props.updateApplicantCertification(
          updatedCertification
        );
        if (res) {
          console.log(res);
        } else {
          console.log("no res detected");
        }
        props.history.push(`/ap/${applicantid}`);
      } catch (err) {
        console.log(err);
      }
    } else {
      const updatedCertification = {
        applicantId: applicantid,
        index: certificationindex,
        title: formState.inputs.title.value,
        organization: formState.inputs.organization.value,
        startDate: formState.inputs.startDate.value,
        endDate: "12/12/40000",
        description: formState.inputs.description.value,
      };
      try {
        const res = await props.updateApplicantCertification(
          updatedCertification
        );
        if (res) {
          console.log(res);
        } else {
          console.log("no res detected");
        }
        props.history.push(`/ap/${applicantid}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  let formContent = (
    <>
      <div className={classes.ContainerFlex}>
        <p className={classes.FormTitle}>Certification</p>

        <div className={classes.FormRow}>
          <div className={classes.EditLabel}>
            <Input
              inputType="input"
              id="title"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="Certification Title *"
              initValue={data.title}
              initIsValid={true}
            />
          </div>

          <div className={classes.EditLabel}>
            <Input
              inputType="input"
              id="organization"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="Issuing Organization*"
              initValue={data.organization}
              initIsValid={true}
            />
          </div>

          <div className={classes.CheckboxDiv}>
            <input
              type="checkbox"
              className={classes.Checkbox}
              onChange={expiryHandler}
            />
            <label className={classes.CheckboxText}>No expiry date</label>
          </div>

          <div className={classes.Period}>
            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="startDate"
                inputClass="DateInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Issue Date*"
                initValue={data.startDate}
                initIsValid={true}
              />
            </div>

            {!expiry ? (
              <div className={classes.EditLabel}>
                <Input
                  inputType="input"
                  id="endDate"
                  inputClass="DateInput"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label="Expiration Date*"
                  initValue={data.endDate}
                  initIsValid={true}
                />
              </div>
            ) : (
              <div />
            )}
          </div>

          <div className={classes.EditLabel}>
            <Input
              inputType="textarea"
              id="description"
              inputClass="EditProfileTextArea"
              validatorMethod={[VALIDATOR_MINLENGTH(20)]}
              onInputHandler={onInputHandler}
              label="Description*"
              initValue={data.description}
              initIsValid={true}
            />
          </div>
        </div>

        <SaveButton
          btnClass="SaveButton"
          disabled={!formState.formIsValid}
          placeholder="Save"
        />
      </div>
    </>
  );
  if (isLoading) {
    formContent = <SpinnerCircle />;
  }

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      {formContent}
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOneApplicant: (data) => dispatch(actionCreators.getOneApplicant(data)),
    updateApplicantCertification: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantCertification(ApplicantData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Certification));
