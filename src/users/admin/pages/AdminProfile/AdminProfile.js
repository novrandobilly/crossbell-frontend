import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../../../store/actions/index";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";

import Button from "../../../../shared/UI_Element/Button";
import classes from "./AdminProfile.module.css";

const AdminProfile = (props) => {
  // const [data, setData] = useState(null);

  const data = {
    NIK: "3321110902070002",
    firstName: "Bambang",
    lastName: "Sulis",
    email: "Bangsul@gmail.com",
    picture:
      "https://ih1.redbubble.net/image.696733874.4106/flat,750x1000,075,f.u3.jpg",
    gender: "male",
    dateOfBirth: "03/03/1998",
    address:
      "Jl. Katulistiwa no.199, desa Konoha, Cibodas, Bandung, Jawa Tengah",
    phoneNumber: "081728499583",
    jobTitle: "Administrator CrossBell",
    isAdmin: true,
  };

  const { getAdmin } = props;

  // useEffect(() => {
  //   const payload = {
  //     token: props.admin.token,
  //     userId: props.admin.userId,
  //   };

  //   getAdmin(payload).then((res) => {
  //     setData(res);
  //   });
  // }, [getAdmin, props.admin]);

  let Content = <SpinnerCircle />;

  if (data && !props.isLoading) {
    Content = (
      <div className={classes.Container}>
        <div className={classes.AdminCard}>
          <div className={classes.LeftCard}>
            <p className={classes.Label}>NIK</p>
            <p>{data.NIK}</p>
            <p className={classes.Label}>Nama</p>
            <p>
              {data.firstName} {data.lastName}
            </p>
            <p className={classes.Label}>Email</p>
            <p>{data.email}</p>
            <p className={classes.Label}>Jenis Kelamin</p>
            <p>{data.gender}</p>
            <p className={classes.Label}>Tanggal Lahir</p>
            <p>{data.dateOfBirth}</p>
            <p className={classes.Label}>Alamat</p>
            <p>{data.address}</p>
            <p className={classes.Label}>Telepon</p>
            <p>{data.phoneNumber}</p>
            <p className={classes.Label}>Peran</p>
            <p>{data.jobTitle}</p>
          </div>
          <div className={classes.RightCard}>
            <div className={classes.RightCardContainer}>
              <img
                src={data.picture}
                className={classes.Picture}
                alt="Profile"
              />
              <Button btnType="EditAdmin" children="Edit Profile" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <React.Fragment>{Content}</React.Fragment>;
};
const mapStateToProps = (state) => {
  return {
    isLoading: state.admin.isLoading,
    error: state.admin.error,
    admin: state.admin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAdmin: (payload) => dispatch(actionCreators.getAdmin(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);
