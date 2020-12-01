import React from "react";

// import Image1 from "../../../../image/carousel_1.png";
// import Image2 from "../../../../image/carousel_2.jpg";
// import Image3 from "../../../../image/carousel_3.jpg";
import classes from "./Carousel.module.css";

const Carousel = (props) => {
  // const image = [Image1, Image2, Image3];

  // const [counter, setCounter] = useState(0);

  // let Imej = image[counter];

  // useEffect(() => {
  //   // let car = document.getElementById("carousel");
  //   // let index = 0;
  //   // let i = 0;
  //   const interval = setInterval(() => {
  //     if (counter < image.length - 1) {
  //       setCounter(counter + 1);
  //     } else {
  //       setCounter(0);
  //     }
  //     // if (++i % 2) {
  //     //   car.style.opacity = 0.3;
  //     // } else {
  //     //   car.src = image[(index = (index + 1) % image.length)];
  //     //   car.style.opacity = 0.4;
  //     // }
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [counter, image]);

  return (
    <React.Fragment>
      <div className={classes.Container}>
        <div className={classes.CarouselHolder}>
          {/* <img
            alt={`carousel`}
            src={Imej}
            className={classes.Image}
            id="carousel"
          /> */}
          <ul className={classes.Carousel}>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Carousel;
