import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "../../../../shared/UI_Element/IconButton";
import TextOnly from "../../../../shared/UI_Element/TextOnly";
import RangeSegment from "../../../../shared/UI_Element/RangeSegment";
import SkillsMap from "../Components/SkillsMap";

import classes from "./ApplicantCard.module.css";


const ApplicantCard = (props) => {
  return (
    <React.Fragment>
      <div className={classes.Container}>
        <div className={classes.ApplicantContainer}>
          <div className={classes.ContainerLeft}>
            {props.picture ? (
              <div
                className={classes.Avatar}
                style={{
                  backgroundImage: `url('${props.picture.url}')`,
                }}
              ></div>
            ) : (
              <AccountCircleIcon
                style={{
                  fontSize: "15rem",
                  marginBottom: "1rem",
                }}
              />
            )}


            <div className={classes.ContainerLeftDivider}>
              <p className={classes.Name}>
                {props.firstName} {props.lastName}
              </p>
              <p className={classes.Title}>{props.headline}</p>

              <div className={classes.ContainerHouse}>
                <p className={classes.Address}>{props.address}</p>
                <p>-</p>
                <p className={classes.City}>{props.city}</p>
              </div>

              <div className={classes.ContainerHouse}>
                <p className={classes.Email}>{props.email}</p>
                <p className={classes.Email}>{props.phone}</p>
                <p className={classes.Email}>
                  {moment().diff(props.dateOfBirth, "years", false)} tahun
                </p>
              </div>

              <a href={props.website} className={classes.Websites}>
                <img
                  className={classes.LinkIcon}
                  alt="web-icon"
                  src={
                    "https://i.pinimg.com/originals/00/50/71/005071cbf1fdd17673607ecd7b7e88f6.png"
                  }
                />
              </a>
            </div>
          </div>

          <div className={classes.ContainerRight}>
            {props.admin && (
              <Link to={`/ad/alphaomega/applicants/${props.id}`}>
                <button> Jobs Applied </button>
              </Link>
            )}
            <Link to={`/ap/${props.id}/intro`}>
              <IconButton />
            </Link>
          </div>
        </div>
      </div>

      <TextOnly
        id={props.id}
        labelName="Summary"
        route={`/ap/${props.id}/summary`}
        text={props.details}
      />
      <RangeSegment
        id={props.id}
        labelName="Education"
        routeEdit={`/ap/${props.id}/education`}
        routeAdd={`/ap/${props.id}/add/education`}
        contents={props.education}
        state="education"
        isLoading={props.applicant.isLoading}
      />
      <RangeSegment
        id={props.id}
        labelName="Experience"
        routeEdit={`/ap/${props.id}/experience`}
        routeAdd={`/ap/${props.id}/add/experience`}
        contents={props.experience}
        state="experience"
        isLoading={props.applicant.isLoading}
      />
      <RangeSegment
        id={props.id}
        labelName="Certification/ Achievement"
        routeEdit={`/ap/${props.id}/certification`}
        routeAdd={`/ap/${props.id}/add/certification`}
        contents={props.certification}
        state="certification"
        isLoading={props.applicant.isLoading}
      />
      <SkillsMap
        id={props.id}
        labelName="Skills"
        routeEdit={`/ap/${props.id}/skills`}
        routeAdd={`/ap/${props.id}/add/skills`}
        skills={props.skills}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.auth.isLogin,
    admin: state.auth.isAdmin,
    applicant: state.applicant,
  };
};

export default connect(mapStateToProps)(ApplicantCard);
