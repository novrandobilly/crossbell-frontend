import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

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
              <p className={classes.CompanySize}>{props.industry}</p>
              <p>|</p>

              <p className={classes.CompanyIndustry}>
                {props.size} people working here
              </p>
            </div>

            <p className={classes.CompanyHeadquarter}>{props.address}</p>

            <a
              href={`https://${props.website}`}
              className={classes.CompanyWebsites}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "80%",
                textDecoration: "none",
                fontSize: "0.8rem",
                fontWeight: "bold",
                color: "rgba(58, 81, 153, 1)",
              }}
            >
              <img
                className={classes.LinkIcon}
                alt="web-icon"
                src="https://i.pinimg.com/originals/00/50/71/005071cbf1fdd17673607ecd7b7e88f6.png"
              />
              {props.website}
            </a>
            <h2
              style={
                props.slotREG < 1
                  ? { color: "rgb(192,18,18)" }
                  : { color: "rgb(57,255,70)" }
              }
            >
              Remaining Slot: {props.slotREG}
            </h2>
          </div>
        </div>
        <div className={classes.ContainerRight}>
          {props.auth.isCompany && props.auth.isActive && (
            <Link to={"/jobs/new"}>
              <IconButton iconType="NewJob" />
            </Link>
          )}

          <Link to={`/co/${props.companyId}/compro/intro`}>
            <IconButton />
          </Link>
        </div>
      </div>

      <TextOnly
        id={props.companyId}
        labelName="Company Brief Descriptions"
        route={`/co/${props.companyId}/compro/details`}
        text={props.briefDescriptions}
      />

      <TextOnly
        id={props.companyId}
        labelName="Company PIC"
        route={`/co/${props.companyId}/compro/mission`}
        text={props.picName}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(CompanyCard);
