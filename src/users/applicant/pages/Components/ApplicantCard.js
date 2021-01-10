import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "../../../../shared/UI_Element/IconButton";
import TextOnly from "../../../../shared/UI_Element/TextOnly";
import RangeSegment from "../../../../shared/UI_Element/RangeSegment";
import SkillsMap from "../Components/SkillsMap";

import classes from "./ApplicantCard.module.css";


const ApplicantCard = (props) => {
  return (
    <div className={classes.Wraper}>
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
              <p className={classes.Address}>{props.address}</p>

              <p className={classes.Email}>{props.email}</p>
              <p className={classes.Email}>{props.phone}</p>
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

      <div className={classes.SegmentContainer}>
        <TextOnly
          id={props.id}
          labelName="Summary"
          route={`/ap/${props.id}/summary`}
          text={props.details}
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
          labelName="Education"
          routeEdit={`/ap/${props.id}/education`}
          routeAdd={`/ap/${props.id}/add/education`}
          contents={props.education}
          state="education"
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
      </div>
    </div>
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
