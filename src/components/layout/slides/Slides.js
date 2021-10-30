import { React } from "react";
import Slider from "react-slick";
import { SlidesData } from "./SlidesData";
var settings = {
  arrows: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  adapterHeight: true,
  focusOnSelect: true,
};
const Slides = () => {
  return (
    <div className="slides">
      <Slider {...settings}>
        {SlidesData.map((slide) => {
          return (
            <div className="">
              <img src={slide.image} alt="" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Slides;

//
