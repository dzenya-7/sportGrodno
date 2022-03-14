import './Banner.css';
import {Fragment, useEffect, useState} from "react";
import img from "./img1.png";
import img1 from "./image1.png";
import img2 from "./img2.png";
import img3 from "./img3.png";

import img_1 from "./img1.jpg";
import img1_1 from "./image1.jpg";
import img2_1 from "./img2.jpg";
import img3_1 from "./img3.jpg";

let slides = [
    {
        eachSlide: img3.toString(),
    },
    {
        eachSlide: img.toString(),
    },
    {
        eachSlide: img1.toString(),
    },
    {
        eachSlide: img2.toString(),
    }
];

let slides_2 = [
    {
        eachSlide: img3_1.toString(),
    },
    {
        eachSlide: img_1.toString(),
    },
    {
        eachSlide: img1_1.toString(),
    },
    {
        eachSlide: img2_1.toString(),
    }


];
const Banner = () => {
    let width
    const [active, setActive] = useState(0);
    const [autoplay, setAutoplay] = useState(1);
    const max = slides.length;
    const intervalBetweenSlides = () => autoplay && setActive(active === max - 1 ? 0 : active + 1)

    useEffect(() => {
        width = window.outerWidth
        console.log(width)
        if(width<720){
            slides = slides_2
        }
        const interval = setInterval( () => intervalBetweenSlides(), 3000);

        return () => clearInterval(interval);
    });

    const setSliderStyles = () => {
        const transition = active * - 100;

        return {
            width: ( slides.length * 100 ) + 'vw',
            transform: 'translateX(' + transition + 'vw)'
        }
    }

    const renderSlides = () => slides.map((item, index) => (
        <img
            className='each-slide'
            key={ index }
            src={item.eachSlide}>
        </img>
    ));
  return (
      <section className='slider'>
          <div
              className='wrapp'
              style={ setSliderStyles() }>
              { renderSlides() }
          </div>

      </section>
  );
}

export default Banner;