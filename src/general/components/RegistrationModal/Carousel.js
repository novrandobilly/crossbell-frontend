import React, { useState, useEffect, useMemo } from 'react';

import i1 from '../../../../assets/images/1.jpg';
import i2 from '../../../../assets/images/2.jpg';
import i3 from '../../../../assets/images/3.jpg';

import classes from './Carousel.module.css';

const ImgComp = ({ src }) => {
	return <img src={src} alt='slide-img' style={{ width: '100%', height: '100vh', opacity: '0.3' }} />;
};

const Carousel = props => {
	const backgroundArr = useMemo(() => {
		return [ <ImgComp src={i1} />, <ImgComp src={i2} />, <ImgComp src={i3} /> ];
	}, []);
	const [ x, setX ] = useState(0);

	useEffect(
		() => {
			const interval = setInterval(() => {
				if (x === (backgroundArr.length - 1) * -100) {
					setX(0);
				} else {
					setX(x - 100);
				}
			}, 15000);
			return () => clearInterval(interval);
		},
		[ x, backgroundArr ]
	);

	return (
		<div className={classes.Slider}>
			{backgroundArr.map((item, i) => {
				return (
					<div key={i} className={classes.Slide} style={{ transform: `translateX(${x}%)` }}>
						{item}
					</div>
				);
			})}
		</div>
	);
};

export default Carousel;
