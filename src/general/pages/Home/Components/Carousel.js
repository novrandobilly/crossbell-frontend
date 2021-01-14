import React from "react";
import classes from "./Carousel.module.css";

const Carousel = (props) => {
  // const image = [Image1, Image2, Image3];

  // const [counter, setCounter] = useState(0);

  // let Imej = image[counter];

  // useEffect(() => {
  //   let car = document.getElementById("carousel");
  //   let index = 0;
  //   let i = 0;
  //   const interval = setInterval(() => {
  //     if (counter < image.length - 1) {
  //       setCounter(counter + 1);
  //     } else {
  //       setCounter(0);
  //     }
  //     if (++i % 2) {
  //       car.style.opacity = 0.3;
  //     } else {
  //       car.src = image[(index = (index + 1) % image.length)];
  //       car.style.opacity = 0.4;
  //     }
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [counter, image]);

  return (
    <React.Fragment>
      <div className={classes.Container}>
        <div className={classes.CarouselHolder}>
          <img
            alt={`carousel`}
            src="https://www.slashgear.com/wp-content/uploads/2020/04/star-wars-backgrounds-14.jpg"
            className={classes.Image}
            id="carousel"
          />
          {/* <ul className={classes.Carousel}>
            <li></li>
            <li></li>
            <li></li>
          </ul> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Carousel;
