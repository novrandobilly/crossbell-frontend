import React from "react";

import classes from "./ContentTextRight.module.css";

const ContentTextRight = (props) => {
  return (
    <div className={classes.Content}>
      <div className={classes.ContentLeft}>Picture</div>
      <div className={classes.ContentRight}>
        <p className={classes.Title}>Help finding your dream career now.</p>
        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          sodales scelerisque quam rutrum eleifend. Proin sed turpis a nulla
          iaculis vulputate nec nec eros. Sed posuere et elit id facilisis.
          Nullam congue finibus massa, eget posuere lectus euismod sed.
          Suspendisse et fermentum tortor. Praesent quis mi eu nisl blandit
          efficitur sodales sit amet nulla. Sed in mi at nisl luctus dignissim
          nec nec arcu. Aliquam consectetur leo mi, a elementum ipsum accumsan
          sit amet.
        </p>
      </div>
    </div>
  );
};

export default ContentTextRight;
