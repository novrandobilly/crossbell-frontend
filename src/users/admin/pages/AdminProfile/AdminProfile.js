import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useForm } from "../../../../shared/utils/useForm";

import * as actionTypes from "../../../../store/actions/actions";
import * as actionCreators from "../../../../store/actions/index";
import { VALIDATOR_ALWAYSTRUE } from "../../../../shared/utils/validator";
import Input from "../../../../shared/UI_Element/Input";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
// import Modal from "../../../../shared/UI_Element/Modal";

import Button from "@material-ui/core/Button";
import classes from "./AdminProfile.module.css";

const AdminProfile = (props) => {
  const [data, setData] = useState();
  const [edit, setEdit] = useState(false);

  const [formState, onInputHandler] = useForm(
    {
      picture: {
        value: data ? data.picture : null,
        isValid: true,
      },
      email: {
        value: data ? data.email : null,
        isValid: true,
      },

      address: {
        value: data ? data.address : null,
        isValid: data && data.address ? true : false,
      },

      phoneNumber: {
        value: data ? data.phoneNumber : null,
        isValid: data && data.phoneNumber ? true : false,
      },

      role: {
        value: data ? data.role : null,
        isValid: data && data.role ? true : false,
      },
    },
    false
  );

  const { getAdmin } = props;
  useEffect(() => {
    if (props.admin.userId) {
      const payload = {
        userId: props.admin.userId,
        token: props.admin.token,
      };
      getAdmin(payload).then((res) => {
        setData(res.admin);
        console.log(res);
      });
    }
  }, [getAdmin, props.admin.userId, props.admin.token]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formState.formIsValid) {
      return props.updateAdminFail();
    }

    const AdminData = {
      userId: props.admin.userId,
      token: props.admin.token,
      picture: formState.inputs.picture.value,
      phoneNumber: formState.inputs.phoneNumber.value,
      role: formState.inputs.role.value,
      email: formState.inputs.email.value,
      address: formState.inputs.address.value,
    };

    try {
      const res = await props.updateAdminIntro(AdminData);
      if (res) {
        console.log(res);
        setEdit(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onEditHandler = (e) => {
    e.preventDefault();
    setEdit(true);
  };

  let content = <SpinnerCircle />;

  if (data && !props.admin.isLoading) {
    content = (
      <div className={classes.Container}>
        <div className={classes.AdminCard}>
          <div className={classes.LeftCard}>
            <p className={classes.Label}>NIK</p>
            <p>{data.NIK}</p>
            <p className={classes.Label}>Nama</p>
            <p>
              {data.firstName} {data.lastName}
            </p>
            <p className={classes.Label}>Jenis Kelamin</p>
            <p>{data.gender}</p>

            <p className={classes.Label}>Tanggal Lahir</p>
            <p>{data.dateOfBirth}</p>

            <p className={classes.Label}>Email</p>
            {edit ? (
              <Input
                inputType="input"
                id="email"
                inputClass="AppInput"
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onInputHandler={onInputHandler}
                label={data.email}
                initValue={data.email}
                initIsValid={true}
              />
            ) : (
              <p>{data.email}</p>
            )}

            <p className={classes.Label}>Alamat</p>
            {edit ? (
              <Input
                inputType="input"
                id="address"
                inputClass="AppInput"
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onInputHandler={onInputHandler}
                label={data.address}
                initValue={data.address}
                initIsValid={true}
              />
            ) : (
              <p>{data.address}</p>
            )}

            <p className={classes.Label}>Telepon</p>
            {edit ? (
              <Input
                inputType="input"
                id="phoneNumber"
                inputClass="AppInput"
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onInputHandler={onInputHandler}
                label={data.phoneNumber}
                initValue={data.phoneNumber}
                initIsValid={true}
              />
            ) : (
              <p>{data.phoneNumber}</p>
            )}

            <p className={classes.Label}>Peran</p>
            {edit ? (
              <Input
                inputType="input"
                id="role"
                inputClass="AppInput"
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onInputHandler={onInputHandler}
                label={data.role}
                initValue={data.role}
                initIsValid={true}
              />
            ) : (
              <p>{data.role}</p>
            )}
          </div>
          <div className={classes.RightCard}>
            <img
              src={
                data.picture ||
                "data:image/png;base64,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"
              }
              className={classes.Picture}
              alt="Profile"
            />
            {edit ? (
              <Button
                variant="outlined"
                color="primary"
                disableElevation
                style={{ marginBottom: "1rem" }}
              >
                upload
              </Button>
            ) : null}
            {edit ? (
              <Button
                variant="contained"
                color="primary"
                disableElevation
                type="submit"
                disabled={!formState.formIsValid}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={onEditHandler}
                type="button"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <form onSubmit={onSubmitHandler}>{content}</form>;
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAdmin: (payload) => dispatch(actionCreators.getAdmin(payload)),
    updateAdminIntro: (payload) =>
      dispatch(actionCreators.updateAdminIntro(payload)),
    updateAdminFail: () => dispatch({ type: actionTypes.UPDATEADMINFAIL }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminProfile));
