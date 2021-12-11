import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ProductItem from "../../product/ProductItem";
import { useSelector } from "react-redux";
const HotProduct = () => {
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

  const product = useSelector((state) => state.product);

  // get 10 product lastest
  const hotProducts = [...product.hotProducts]
    .sort((a, b) => {
      var dateA = new Date(a.createdAt).getTime();
      var dateB = new Date(b.createdAt).getTime();
      return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
    })
    .slice(0, 10);
  useEffect(() => {
    if (window.innerWidth > 765) setSlide(settings);
    else setSlide(settings765);
  }, []);
  return (
    <div className="hot-product mgb-45">
      <h3 className="hot-product__heading ">Sản phẩm mới</h3>

      <Slider {...slide}>
        {hotProducts.map((product) => {
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

export default HotProduct;
