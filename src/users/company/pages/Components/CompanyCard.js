import React from "react";

import classes from "./CompanyCard.module.css";

const CompanyCard = (props) => {
  return (
    <>
      <div className={classes.Container}>
        <div className={classes.ContainerLeft}>
          <img
            src={props.logo}
            alt="company-logo"
            className={classes.Logo}
          ></img>

          <div className={classes.ContainerLeftDivider}>
            <p className={classes.CompanyName}>{props.name}</p>

            <div className={classes.ContainerSizeIn}>
              <p className={classes.CompanySize}>{props.size}</p>
              <p>-</p>
              <p className={classes.CompanyIndustry}>{props.industry}</p>
            </div>

            <p className={classes.CompanyHeadquarter}>{props.address}</p>

            <a href={props.website} className={classes.CompanyWebsites}>
              <img
                className={classes.LinkIcon}
                alt="web-icon"
                src="https://i.pinimg.com/originals/00/50/71/005071cbf1fdd17673607ecd7b7e88f6.png"
              ></img>
            </a>
          </div>
        </div>
      </div>

      <div className={classes.DetailContainer}>
        <p className={classes.DetailLabel}>Company Detail</p>
        <p className={classes.CompanyDetail}>{props.detail}</p>
      </div>

      <div className={classes.MissionContainer}>
        <p className={classes.MissionLabel}>Company Mission</p>
        <p className={classes.CompanyMission}>{props.mission}</p>
      </div>
    </>
  );
};
export default CompanyCard;
