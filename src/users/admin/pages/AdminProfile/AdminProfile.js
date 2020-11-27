import React from "react";

import Button from "../../../../shared/UI_Element/Button";
import classes from "./AdminProfile.module.css";

const AdminData = {
  NIK: "3321110902070002",
  firstName: "Bambang",
  lastName: "Sulis",
  email: "Bangsul@gmail.com",
  picture:
    "https://ih1.redbubble.net/image.696733874.4106/flat,750x1000,075,f.u3.jpg",
  gender: "male",
  dateOfBirth: "03/03/1998",
  address: "Jl. Katulistiwa no.199, desa Konoha, Cibodas, Bandung, Jawa Tengah",
  phoneNumber: "081728499583",
  jobTitle: "Administrator CrossBell",
  isAdmin: true,
};
const AdminProfile = () => {
  let Content = (
    <div className={classes.Container}>
      <div className={classes.AdminCard}>
        <div className={classes.LeftCard}>
          <p className={classes.Label}>NIK</p>
          <p className={classes.Text}>{AdminData.NIK}</p>
          <p className={classes.Label}>Name</p>
          <p className={classes.Text}>
            {AdminData.firstName} {AdminData.lastName}
          </p>
          <p className={classes.Label}>Email</p>
          <p className={classes.Text}>{AdminData.email}</p>
          <p className={classes.Label}>Gender</p>
          <p className={classes.Text}>{AdminData.gender}</p>
          <p className={classes.Label}>Birth Date</p>
          <p className={classes.Text}>{AdminData.dateOfBirth}</p>
          <p className={classes.Label}>Address</p>
          <p className={classes.Text}>{AdminData.address}</p>
          <p className={classes.Label}>Phone</p>
          <p className={classes.Text}>{AdminData.phoneNumber}</p>
          <p className={classes.Label}>Title</p>
          <p className={classes.Text}>{AdminData.jobTitle}</p>
        </div>
        <div className={classes.RightCard}>
          <div className={classes.RightCardContainer}>
            <img
              src={AdminData.picture}
              className={classes.Picture}
              alt="Profile"
            />
            <Button btnType="EditAdmin" children="Edit Profile" />
          </div>
        </div>
      </div>
    </div>
  );

  return <React.Fragment>{Content}</React.Fragment>;
};

export default AdminProfile;
