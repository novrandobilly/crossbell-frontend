import React from 'react';
import { Link } from 'react-router-dom';

import IconButton from '../../../../shared/UI_Element/IconButton';

import classes from './SkillsMap.module.css';

const SkillsMap = (props) => {
  return (
    <div className={classes.Wraper}>
      <div className={classes.Container}>
        <div className={classes.Header}>
          {props.labelName && (
            <label className={classes.Label}>{props.labelName}</label>
          )}
          <div>
            <Link to={props.routeEdit}>
              <IconButton />
            </Link>
          </div>
        </div>

        {props.skills.length < 1 && (
          <p className={classes.EmptyDescription}>
            Silahkan lengkapi data diri anda terlebih dahulu
          </p>
        )}

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
    </div>
  );
};

export default SkillsMap;
