import React from 'react';

import ContentTextLeft from '../Home/HomeContent/ContentTextLeft';
import ContentTextRight from '../Home/HomeContent/ContentTextRight';
import FeatureContent from '../Home/HomeContent/FeatureContent';
import TeamContent from '../Home/HomeContent/TeamContent';

import classes from './AboutUs.module.css';

const AboutUs = () => {
  return (
    <div className={classes.AboutUs}>
      {/* <div className={classes.AboutUsBanner}>Company Banner</div>
      <div className={classes.MissionValues}>
        <h3>Our Mission</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          pellentesque, lacus quis fermentum fringilla.
        </p>
      </div>
      <div className={classes.MissionValues}>
        <h3>Our Values</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          pellentesque, lacus quis fermentum fringilla, urna velit aliquam
          lorem, sed vehicula nunc risus non dolor. Nunc vulputate interdum
          nunc, eget mollis arcu pharetra non. Etiam eget placerat quam, ut
          euismod ipsum. Aliquam nec magna quam. Morbi eu ornare sem, eu feugiat
          enim. Morbi scelerisque quis sem nec consequat. Suspendisse potenti.
          Proin vestibulum ac lorem vitae luctus. Maecenas diam ligula, blandit
          non justo at, fermentum sodales diam. Nam vitae iaculis libero. In
          tristique purus vehicula eros porta, nec tristique lacus condimentum.
          Aenean ullamcorper, augue et tempor maximus, enim orci sagittis
          libero, porta imperdiet mi ligula ut nulla. Suspendisse ornare tempus
          urna eget posuere. Fusce quis purus eu dui tincidunt pellentesque.
        </p>
      </div>
      <div className={classes.MissionValues}>
        <h3>About Crossbell</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          pellentesque, lacus quis fermentum fringilla, urna velit aliquam
          lorem, sed vehicula nunc risus non dolor. Nunc vulputate interdum
          nunc, eget mollis arcu pharetra non. Etiam eget placerat quam, ut
          euismod ipsum. Aliquam nec magna quam. Morbi eu ornare sem, eu feugiat
          enim. Morbi scelerisque quis sem nec consequat. Suspendisse potenti.
          Proin vestibulum ac lorem vitae luctus. Maecenas diam ligula, blandit
          non justo at, fermentum sodales diam. Nam vitae iaculis libero. In
          tristique purus vehicula eros porta, nec tristique lacus condimentum.
          Aenean ullamcorper, augue et tempor maximus, enim orci sagittis
          libero, porta imperdiet mi ligula ut nulla. Suspendisse ornare tempus
          urna eget posuere. Fusce quis purus eu dui tincidunt pellentesque.
        </p>
        <p>
          Phasellus fringilla pulvinar velit, a mollis ante interdum vel.
          Pellentesque congue in metus sed interdum. Suspendisse elementum lacus
          nec quam blandit pharetra. Mauris condimentum bibendum nibh et mattis.
          Nullam suscipit dapibus accumsan. Vestibulum sit amet tincidunt ex.
          Integer sed imperdiet augue. Maecenas ut mi lacus. Sed dignissim
          scelerisque dictum. Etiam eget tristique sapien. Nunc vel consequat
          neque. Pellentesque ut cursus sapien. Etiam lobortis augue justo, non
          euismod arcu malesuada a.
        </p>
        <p>
          Praesent gravida nisi sit amet maximus fermentum. Vivamus luctus
          pellentesque quam vitae dictum. In molestie enim risus. Ut maximus,
          lacus vitae semper molestie, velit elit finibus lorem, sed posuere
          arcu eros nec diam. Morbi odio sem, vehicula a pretium posuere,
          feugiat eget justo. Sed at mauris eget tellus molestie fringilla id
          scelerisque nisl. Praesent eu justo sed ligula viverra ornare.
          Vestibulum rutrum volutpat risus. Cras et consequat velit. Curabitur
          in pulvinar eros. Curabitur consectetur, arcu porttitor vehicula
          molestie, nisi lorem vulputate sapien, vitae placerat risus dolor in
          turpis. Integer fermentum pharetra nisl, in tincidunt diam venenatis
          a.
        </p>
      </div> */}
      <div className={classes.AboutUsBanner}>Company Banner</div>
      <FeatureContent />
      <ContentTextLeft />
      <ContentTextRight />
      <TeamContent />
    </div>
  );
};

export default AboutUs;
