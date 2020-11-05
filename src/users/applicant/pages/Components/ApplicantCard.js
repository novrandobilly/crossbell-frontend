import React from "react";
import { Link } from "react-router-dom";

import IconButton from "../../../../shared/UI_Element/IconButton";
import TextOnly from "../../../../shared/UI_Element/TextOnly";
import RangeSegment from "../../../../shared/UI_Element/RangeSegment";
import SkillsMap from "../Components/SkillsMap";

import classes from "./ApplicantCard.module.css";

const ApplicantCard = (props) => {
  return (
    <>
      <div className={classes.Container}>
        <div className={classes.ContainerLeft}>
          <img
            src="https://vignette.wikia.nocookie.net/shingekinokyojin/images/4/4f/Mikasa_Ackermann_%28Anime%29_character_image.png/revision/latest?cb=20190710121820"
            alt="applicant"
            className={classes.Picture}
          ></img>

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
            </div>

            <a href={props.website} className={classes.Websites}>
              <img
                className={classes.LinkIcon}
                alt="web-icon"
                src="https://i.pinimg.com/originals/00/50/71/005071cbf1fdd17673607ecd7b7e88f6.png"
              ></img>
            </a>
          </div>

          <div className={classes.ContainerRight}>
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
        routeAdd={`/ap/${props.id}/education`}
        contents={props.education}
      />

      <RangeSegment
        id={props.id}
        labelName="Experience"
        routeEdit={`/ap/${props.id}/experience`}
        routeAdd={`/ap/${props.id}/experience`}
        contents={props.experience}
      />

      <RangeSegment
        id={props.id}
        labelName="Certification/ Achievement"
        routeEdit={`/ap/${props.id}/certification`}
        routeAdd={`/ap/${props.id}/certification`}
        contents={props.certification}
      />

      <SkillsMap
        id={props.id}
        labelName="Skills"
        routeEdit={`/ap/${props.id}/skills`}
        routeAdd={`/ap/${props.id}/skills`}
        skills={props.skills}
      />
    </>
  );
};
export default ApplicantCard;
