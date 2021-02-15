import React from 'react';

import classes from './FAQ.module.css';

const FAQ = () => {
  return (
    <div className={classes.Container}>
      <h2>Frequently Asked Question #1 Company Related Question</h2>
      <div>
        <h3>Q: </h3>
        <p>How to register as a company?</p>
      </div>

      <div>
        <h3>A: </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          blandit facilisis diam, vel rhoncus diam commodo id. Phasellus
          accumsan leo finibus convallis commodo. Nullam orci metus, lobortis
          consectetur porttitor et, imperdiet nec nibh. Nunc purus leo,
          fermentum at urna nec, fringilla aliquet est. Fusce venenatis ultrices
          est, vel varius massa tristique posuere. Nam in tincidunt libero. Nam
          id eros lacinia, cursus lacus eget, posuere tellus. Nullam id augue
          dictum, dignissim justo eget, finibus tortor. Praesent venenatis
          euismod venenatis. Duis auctor, nunc id lacinia viverra, orci metus
          sollicitudin sem, ac tempus dolor ipsum non libero. Nulla ornare
          sapien id sodales gravida. In id erat ex. Pellentesque scelerisque
          tempus eros quis lacinia. Donec convallis enim a luctus consectetur.
          Curabitur tristique nulla ut nibh ultricies aliquet.
        </p>
      </div>

      <div>
        <h3>Q: </h3>
        <p>How to order bulk candidates from my account?</p>
      </div>

      <div>
        <h3>A: </h3>
        <p>
          Nulla scelerisque imperdiet lobortis. Quisque elementum elementum
          consectetur. Aenean pulvinar tellus at orci rutrum tempus. Vestibulum
          eu diam vel massa malesuada ultrices ut in nulla. Donec vel magna
          vehicula, porttitor leo sodales, fermentum tortor. Proin sed sapien in
          lectus maximus mollis. Maecenas sed massa ut urna vehicula vehicula a
          vel velit. Phasellus efficitur dui quis tellus elementum, vel finibus
          leo aliquam. Proin sit amet neque nec mauris viverra viverra. Nunc
          tincidunt auctor pulvinar. Cras tincidunt elementum est eu semper.
          Etiam quis tellus at odio lobortis bibendum eget sit amet est.
        </p>
      </div>
    </div>
  );
};

export default FAQ;
