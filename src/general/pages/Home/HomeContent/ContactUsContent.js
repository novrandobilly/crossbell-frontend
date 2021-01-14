import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../../../shared/utils/useForm";
import { connect } from "react-redux";

import * as actionCreators from "../../../../store/actions/index";
import Input from "../../../../shared/UI_Element/Input";
import Button from "@material-ui/core/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_NUMSTR,
} from "../../../../shared/utils/validator";

import classes from "./ContactUsContent.module.css";

const ContactUsContent = (props) => {
  const [formState, onInputHandler] = useForm(
    {
      nama: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      feed: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const newFeed = {
      name: formState.inputs.nama.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      feed: formState.inputs.feed.value,
    };
    try {
      const res = await props.createFeed(newFeed);
      console.log(res);
      if (res) {
        alert("Success Posting your feed!");
        console.log(res);
      } else {
        throw new Error("Error nih bro");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.Content}>
      <div className={classes.HelpArticles}>
        <p className={classes.HeaderTitle}>Help Articles</p>
        <ul className={classes.HelpArticlesLink}>
          <li>
            <Link to="#">I am an Employer, how can I post a job ads?</Link>
          </li>
          <li>
            <Link to="#">What's the benefit of becoming a jobseeker here?</Link>
          </li>
          <li>
            <Link to="#">What's the benefit of becoming an employer here?</Link>
          </li>
          <li>
            <Link to="#">I can't remember my login password</Link>
          </li>
          <li>
            <Link to="#">
              I have a billing question (unrecognized charge, invoicing)
            </Link>
          </li>
          <li>
            <Link to="#">I want to report a security issue</Link>
          </li>
        </ul>
        <span className={classes.SeeAllArticles}>
          <Link to="#">See all help articles</Link>
        </span>
      </div>
      <div className={classes.NeedSupport}>
        <p className={classes.HeaderTitle}>Contact Us</p>
        <form onSubmit={onSubmitHandler} className={classes.ContactUsForm}>
          <Input
            inputType="input"
            label="Nama Lengkap"
            id="nama"
            name="nama"
            onInputHandler={onInputHandler}
            validatorMethod={[VALIDATOR_REQUIRE()]}
          />
          <Input
            inputType="input"
            label="Email"
            id="email"
            name="email"
            onInputHandler={onInputHandler}
            validatorMethod={[VALIDATOR_EMAIL()]}
          />
          <Input
            inputType="input"
            label="No Telephone"
            id="phone"
            name="phone"
            onInputHandler={onInputHandler}
            validatorMethod={[VALIDATOR_NUMSTR()]}
          />
          <Input
            inputType="textarea"
            label="Pesan..."
            rows={4}
            id="feed"
            name="feed"
            onInputHandler={onInputHandler}
            validatorMethod={[VALIDATOR_MINLENGTH(10)]}
          />

          <div className={classes.Footer}>
            <Button
              disabled={!formState.formIsValid}
              variant="contained"
              color="primary"
              type="submit"
              size="small"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createFeed: (newFeed) => dispatch(actionCreators.createFeed(newFeed)),
  };
};

export default connect(null, mapDispatchToProps)(ContactUsContent);
