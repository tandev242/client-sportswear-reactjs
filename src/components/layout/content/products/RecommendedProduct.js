import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ProductItem from "../../product/ProductItem";
const RecommendedProduct = ({products}) => {
  var settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    adapterHeight: true,
    focusOnSelect: true,
  };
  var settings765 = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    adapterHeight: true,
    focusOnSelect: true,
  };
  const [slide, setSlide] = useState({});

  useEffect(() => {
    if (window.innerWidth > 765) setSlide(settings);
    else setSlide(settings765);
  }, []);
  return (
    <div className="hot-product mgb-45">
      <h3 className="hot-product__heading ">Có thể bạn quan tâm</h3>

      <Slider {...slide}>
        {products.map((product) => {
          return (
            <div className="col-2-4">
              <ProductItem product={product} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default RecommendedProduct;
