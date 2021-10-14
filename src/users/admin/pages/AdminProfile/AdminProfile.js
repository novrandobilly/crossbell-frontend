import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import moment from 'moment';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_ALWAYSTRUE } from '../../../../shared/utils/validator';
import Input from '../../../../shared/UI_Element/Input';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
// import Modal from "../../../../shared/UI_Element/Modal";

import Button from '@material-ui/core/Button';
import classes from './AdminProfile.module.css';
import BlankProfile from '../../../../assets/images/Blank_Profile.png';

const AdminProfile = props => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getAdmin } = props;
  useEffect(() => {
    if (props.admin.userId) {
      const payload = {
        userId: props.admin.userId,
        token: props.admin.token,
      };
      getAdmin(payload).then(res => {
        setData(res?.admin);
      });
    }
  }, [getAdmin, props.admin.userId, props.admin.token]);

  const onSubmitHandler = async event => {
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
        props.history.push(`/ad/alphaomega/profile`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onEditHandler = e => {
    e.preventDefault();
    setEdit(true);
  };

  const onUploadHandler = e => {
    const elementId = e.target.name;
    const elementFile = e.target.files[0];
    onInputHandler(elementId, elementFile, true);
  };

  let content = <LoadingBar />;

  if (data && !props.admin.isLoading) {
    content = (
      <form onSubmit={onSubmitHandler} className={classes.FormCard}>
        <div className={classes.AdminCard}>
          <div className={classes.RightCard}>
            <div
              className={classes.Picture}
              style={{
                backgroundImage: `url('${data.picture ? data.picture.url : BlankProfile}')`,
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
                  <Button variant='outlined' color='primary' disableElevation style={{ marginBottom: '1rem' }} component='span'>
                    upload
                  </Button>
                </label>
              </div>
            ) : null}
            {edit ? (
              <Button variant='contained' color='primary' disableElevation type='submit' disabled={!formState.formIsValid}>
                Save
              </Button>
            ) : (
              <Button variant='contained' color='primary' disableElevation onClick={onEditHandler} type='button'>
                Edit Profile
              </Button>
            )}
          </div>

          <div className={classes.LeftCard}>
            <div className={classes.ContentWraper}>
              <div className={classes.LabelWraper}>
                <p className={classes.Label}>NIK</p>
                <p className={classes.LabelData}>{data.NIK}</p>
              </div>

              <div className={classes.LabelWraper}>
                <p className={classes.Label}>Nama</p>
                <p className={classes.LabelData}>
                  {data.firstName} {data.lastName}
                </p>
              </div>
            </div>

            <div className={classes.ContentWraper}>
              <div className={classes.LabelWraper}>
                <p className={classes.Label}>Jenis Kelamin</p>
                <p className={classes.LabelData}>{data.gender}</p>
              </div>

              <div className={classes.LabelWraper}>
                <p className={classes.Label}>Tanggal Lahir</p>
                <p className={classes.LabelData}>{moment(data.dateOfBirth).format('LL')}</p>
              </div>
            </div>

            <div className={classes.ContentWraper}>
              <div className={classes.LabelWraper}>
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
                  <p className={classes.LabelData}>{data.email}</p>
                )}
              </div>

              <div className={classes.LabelWraper}>
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
                  <p className={classes.LabelData}>{data.address}</p>
                )}
              </div>
            </div>

            <div className={classes.ContentWraper}>
              <div className={classes.LabelWraper}>
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
                  <p className={classes.LabelData}>{data.phoneNumber}</p>
                )}
              </div>

              <div className={classes.LabelWraper}>
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
                  <p className={classes.LabelData}>{data.role}</p>
                )}
              </div>
            </div>
            <div className={classes.ContentWraper} />
          </div>
        </div>
      </form>
    );
  }

  return <div className={classes.Container}>{content} </div>;
};

const mapStateToProps = state => {
  return {
    admin: state.admin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAdmin: payload => dispatch(actionCreators.getAdmin(payload)),
    updateAdminIntro: payload => dispatch(actionCreators.updateAdminIntro(payload)),
    updateAdminFail: () => dispatch({ type: actionTypes.UPDATEADMINFAIL }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminProfile));
