import React from "react";
import { Link } from "react-router-dom";

import classes from "./ApplicantCard.module.css";

import IconButton from "../../../../shared/UI_Element/IconButton";
import TextOnly from "../../../../shared/UI_Element/TextOnly";
import RangeSegment from "../../../../shared/UI_Element/RangeSegment";

const ApplicantCard = (props) => {
  console.log(props.education);
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
            <p className={classes.Name}>{props.name}</p>
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
            <Link to={"/jobs/new"}>
              <IconButton iconType="NewJob" />
            </Link>

            <Link to={`/co/${props.id}/compro/Intro`}>
              <IconButton />
            </Link>
          </div>
        </div>
      </div>

      <TextOnly
        id={props.id}
        labelName="Summary"
        route="#"
        text={props.details}
      />

      <RangeSegment
        id={props.id}
        labelName="Education"
        route="#"
        title={props.school}
        subTitle={props.major}
        start={props.startEdu}
        end={props.endEdu}
        description={props.description}
      />

      <RangeSegment
        id={props.id}
        labelName="Experience"
        route="#"
        title={props.prevTitle}
        subTitle={props.prevCompany}
        start={props.startExp}
        end={props.endExp}
        description={props.prevDescription}
      />

      <RangeSegment
        id={props.id}
        labelName="Certification/ Achievement"
        route="#"
        title={props.title}
        subTitle={props.organization}
        start={props.startCert}
        end={props.endCert}
        description={props.certDescription}
      />
    </>
  );
};
export default ApplicantCard;
