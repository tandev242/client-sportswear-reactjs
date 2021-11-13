import React from "react";
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

  const product = useSelector((state) => state.product);

  const currentDate = new Date();

  // const hotProduct = product.products.filter((product) => {
  //   return currentDate - new Date(product?.createdAt) < 864000000;
  // });
  const hotProduct = product.products;

  return (
    <div className="hot-product mgb-45">
      <h3 className="hot-product__heading ">Sản phẩm hot</h3>

      <Slider {...settings}>
        {hotProduct.map((product) => {
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
