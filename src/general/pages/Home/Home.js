import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { VALIDATOR_REQUIRE } from "../../../shared/utils/validator";

import Carousel from "./Components/Carousel";
// import Input from "../../../shared/UI_Element/Input";
// import Button from "../../../shared/UI_Element/Button";
import AuthForm from "./Components/AuthForm";
import ContentTextRight from "./HomeContent/ContentTextRight";
import ContentTextLeft from "./HomeContent/ContentTextLeft";
import ContactUsContent from "./HomeContent/ContactUsContent";
import FeatureContent from "./HomeContent/FeatureContent";
import TeamContent from "./HomeContent/TeamContent";
import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <React.Fragment>
      <Carousel />
      <div className={classes.Content}>
        <div className={classes.ContentHolder}>
          <h1>CROSSBELL</h1>
          <p className={classes.About}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className={classes.LinkRef}>
            <Link to={`/jobs-dashboard`}>
              <p>EXPLORE JOBS HERE</p>
            </Link>
          </div>
        </div>
        <div className={classes.Margin}>
          {!props.auth.isLoggedIn && !props.admin.isLoggedIn && <AuthForm />}
        </div>
      </div>
      <FeatureContent />
      <ContentTextRight />
      <ContentTextLeft />
      <TeamContent />
      <ContactUsContent />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    admin: state.admin,
  };
};

export default connect(mapStateToProps)(Home);
