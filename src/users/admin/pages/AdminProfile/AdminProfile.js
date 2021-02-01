import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_ALWAYSTRUE } from '../../../../shared/utils/validator';
import Input from '../../../../shared/UI_Element/Input';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
// import Modal from "../../../../shared/UI_Element/Modal";

import Button from '@material-ui/core/Button';
import classes from './AdminProfile.module.css';

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
      role: formState.inputs.role.value,
      email: formState.inputs.email.value,
      address: formState.inputs.address.value,
      phoneNumber: formState.inputs.phoneNumber.value,
    };

    try {
      const res = await props.updateAdminIntro(AdminData);
      if (res) {
        console.log(res);
        setEdit(false);
        props.history.push(`/`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onEditHandler = (e) => {
    e.preventDefault();
    setEdit(true);
  };

  const onUploadHandler = (e) => {
    const elementId = e.target.name;
    const elementFile = e.target.files[0];
    onInputHandler(elementId, elementFile, true);
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
                inputType='input'
                id='email'
                InputClass='AppInput'
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
                inputType='input'
                id='address'
                InputClass='AppInput'
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onInputHandler={onInputHandler}
                label='Sesuai alamat saat ini'
                initValue={data.address}
                initIsValid={true}
              />
            ) : (
              <p>{data.address}</p>
            )}

            <p className={classes.Label}>Telepon</p>
            {edit ? (
              <Input
                inputType='input'
                id='phoneNumber'
                InputClass='AppInput'
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
                inputType='input'
                id='role'
                InputClass='AppInput'
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
            <div
              className={classes.Picture}
              style={{
                backgroundImage: `url('${data.picture.url}')`,
              }}
            />
            {edit ? (
              <div>
                <input
                  accept='.jpg, .jpeg, .png'
                  name='picture'
                  className={classes.input}
                  id='picture'
                  type='file'
                  style={{ display: 'none' }}
                  onChange={onUploadHandler}
                />
                <label htmlFor='picture'>
                  {' '}
                  <Button
                    variant='outlined'
                    color='primary'
                    disableElevation
                    style={{ marginBottom: '1rem' }}
                    component='span'
                  >
                    upload
                  </Button>
                </label>
              </div>
            ) : null}
            {edit ? (
              <Button
                variant='contained'
                color='primary'
                disableElevation
                type='submit'
                disabled={!formState.formIsValid}
              >
                Save
              </Button>
            ) : (
              <Button
                variant='contained'
                color='primary'
                disableElevation
                onClick={onEditHandler}
                type='button'
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
