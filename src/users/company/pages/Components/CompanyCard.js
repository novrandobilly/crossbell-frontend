import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import IconButton from "../../../../shared/UI_Element/IconButton";
import TextOnly from "../../../../shared/UI_Element/TextOnly";

import classes from "./CompanyCard.module.css";

const CompanyCard = (props) => {
  return (
    <div className={classes.Wraper}>
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

          <p
            className={classes.Slot}
            style={
              props.slotREG < 1
                ? { color: "rgb(255, 46, 46)" }
                : { color: "rgb(0, 135, 9)" }
            }
          >
            Remaining Slot: {props.slotREG}
          </p>

          <p className={classes.CompanyName}>{props.companyName}</p>

          <p className={classes.CompanyIndustry}>{props.industry}</p>

          <p className={classes.CompanyHeadquarter}>{props.address}</p>

          <a
            href={`https://${props.website}`}
            className={classes.CompanyWebsites}
          >
            <img
              className={classes.LinkIcon}
              alt="web-icon"
              src="https://i.pinimg.com/originals/00/50/71/005071cbf1fdd17673607ecd7b7e88f6.png"
              style={{ marginRight: "1rem" }}
            />
            {props.website}
          </a>
        </div>

        <div className={classes.EditProfile}>
          <Link to={`/co/${props.companyId}/compro/intro`}>
            <IconButton />
          </Link>
        </div>
      </div>

      <div className={classes.Content}>
        <TextOnly
          id={props.companyId}
          labelName="Company Brief Descriptions"
          route={`/co/${props.companyId}/compro/details`}
          text={props.briefDescriptions}
        />

        <div className={classes.PicContainer}>
          <div className={classes.PicHeader}>
            <p className={classes.Title}>Company PIC</p>

            <div className={classes.EditPIC}>
              <Link to={`/co/${props.companyId}/compro/intro`}>
                <IconButton />
              </Link>
            </div>
          </div>

          <div className={classes.PicContent}>
            <div className={classes.TextHolder}>
              <div className={classes.TextWraper}>
                <p className={classes.PicLabel}>Nama PIC: </p>
                <p>{props.picName}</p>
              </div>

              <div className={classes.TextWraper}>
                <p className={classes.PicLabel}>Bekerja Sebagai: </p>
                <p>{props.picJobTitle}</p>
              </div>
            </div>

            <div className={classes.TextHolder}>
              <div className={classes.TextWraper}>
                <p className={classes.PicLabel}>Email: </p>
                <p>{props.picEmail}</p>
              </div>

              <div className={classes.TextWraper}>
                <p className={classes.PicLabel}>Telepon: </p>
                <p>{props.picPhone}</p>
              </div>

              <div className={classes.TextWraper}>
                <p className={classes.PicLabel}>Kantor: </p>
                <p>{props.picOfficePhone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(CompanyCard);
