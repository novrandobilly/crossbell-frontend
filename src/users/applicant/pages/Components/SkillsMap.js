import React from "react";
import { Link } from "react-router-dom";

import IconButton from "../../../../shared/UI_Element/IconButton";

import classes from "./SkillsMap.module.css";

const RangeSegment = (props) => {
  return (
    <>
      <div className={classes.Line}></div>

      <div className={classes.Container}>
        <div className={classes.Header}>
          {props.labelName && (
            <label className={classes.Label}>{props.labelName}</label>
          )}
          <div>
            <Link to={props.routeAdd}>
              <IconButton iconType="NewSegment" />
            </Link>
            <Link to={props.routeEdit}>
              <IconButton />
            </Link>
          </div>
        </div>

        <div className={classes.MapContainer}>
          {props.skills &&
            props.skills.map((skill, i) => {
              return (
                <div key={i}>
                  <p className={classes.SkillContainer}>{skill}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default RangeSegment;
