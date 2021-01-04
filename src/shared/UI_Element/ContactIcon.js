import React from "react";

import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import classes from "./ContactIcon.module.css";

const ContactIcon = (props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.IconContainer}>
        <a href="https://instagram.com">
          <WhatsAppIcon style={{ fontSize: "22pt", color: "white" }} />
        </a>
        <a href="https://web.whatsapp.com">
          <InstagramIcon style={{ fontSize: "22pt", color: "white" }} />
        </a>
      </div>
    </div>
  );
};

export default ContactIcon;
