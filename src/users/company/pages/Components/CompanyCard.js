import React from "react";
import { Link } from "react-router-dom";

import IconButton from "../../../../shared/UI_Element/IconButton";
import TextOnly from "../../../../shared/UI_Element/TextOnly";

import classes from "./CompanyCard.module.css";

const CompanyCard = (props) => {
  return (
    <React.Fragment>
      <div className={classes.Container}>
        <div className={classes.ContainerLeft}>
          <img
            src={
              props.logo ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="company-logo"
            className={classes.Logo}
          />

          <div className={classes.ContainerLeftDivider}>
            <p className={classes.CompanyName}>{props.companyName}</p>

            <div className={classes.ContainerSizeIn}>
              <p className={classes.CompanySize}>{props.size}</p>
              <p>-</p>
              <p className={classes.CompanyIndustry}>{props.industry}</p>
            </div>

            <p className={classes.CompanyHeadquarter}>{props.address}</p>

            <a
              href={`https://${props.website}`}
              className={classes.CompanyWebsites}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                className={classes.LinkIcon}
                alt="web-icon"
                src="https://i.pinimg.com/originals/00/50/71/005071cbf1fdd17673607ecd7b7e88f6.png"
              />
              {props.website}
            </a>
          </div>

          <div className={classes.ContainerRight}>
            <Link to={"/jobs/new"}>
              <IconButton iconType="NewJob" />
            </Link>

            <Link to={`/co/${props.companyId}/compro/Intro`}>
              <IconButton />
            </Link>
          </div>
        </div>
      </div>

      <TextOnly
        id={props.companyId}
        labelName="Company Detail"
        route="details"
        text={props.details}
      />

      <TextOnly
        id={props.companyId}
        labelName="Company Mission"
        route="mission"
        text={props.mission}
      />
    </React.Fragment>
  );
};
export default CompanyCard;
