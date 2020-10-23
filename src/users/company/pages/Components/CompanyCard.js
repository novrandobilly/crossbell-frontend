import React from "react";
import { Link } from "react-router-dom";

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

          <div className={classes.ContainerRight}>
            <Link to={"/jobs/new"}>
              <button className={classes.AddJob}>
                <span>+</span>
              </button>
            </Link>

            <Link to={`/co/${props.id}/compro/Intro`}>
              <button className={classes.AddJob}>
                <span>#</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className={classes.DetailContainer}>
        <div className={classes.Header}>
          <p className={classes.DetailLabel}>Company Detail</p>
          <div className={classes.ContainerRight}>
            <Link to={`/co/${props.id}/compro/Details`}>
              <button className={classes.AddJob}>Edit</button>
            </Link>
          </div>
        </div>
        <p className={classes.CompanyDetail}>{props.detail}</p>
      </div>

      <div className={classes.Line}></div>

      <div className={classes.MissionContainer}>
        <div className={classes.Header}>
          <p className={classes.DetailLabel}>Company Mission</p>
          <div className={classes.ContainerRight}>
            <Link to={`/co/${props.id}/compro/Mission`}>
              <button className={classes.AddJob}>edit</button>
            </Link>
          </div>
        </div>

        <p className={classes.CompanyMission}>{props.mission}</p>
      </div>

      <div className={classes.Line}></div>
    </>
  );
};
export default CompanyCard;
