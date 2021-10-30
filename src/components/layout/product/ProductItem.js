import React from "react";
import { Link } from "react-router-dom";
import Lazyload from 'react-lazyload'

const ProductItem = ({ product }) => {
  const checkNew = (createdAt) => {
    const currentDate = new Date();
    const createDate = new Date(createdAt);
    if (currentDate - createDate < 864000000) return true;
    return false;
  };

  return (
    <Lazyload throttle={200} height={300}>
      <Link
        to={`/product/${product.slug}`}
        className="hot-product__item"
        key={product._id}
      >
        <div className="hot-product__item-img">
          <img
            className="item-img"
            src={product.productPictures[0].img}
            alt={product.name}
          />
          {product?.productPictures.length > 1 ? (
            <ul className="sub-img">
              {product.productPictures.map((item) => {
                return (
                  <li className="sub-img__item" key={item.id}>
                    <img src={item.img} alt="" />
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
        <div className="item-body">
          <h4 className="item-body__name">{product.name}</h4>
          <div className="item-body__price">
            <p className="item-body__price-old">
              ₫{new Intl.NumberFormat("de-DE").format(product.price)}
            </p>
            <p className="item-body__price-current">
              ₫
              {new Intl.NumberFormat("de-DE").format(
                product.price - (product.discountPercent / 100) * product.price
              )}
            </p>
          </div>
        </div>
        {checkNew(product.createdAt) ? (
          <span className="label-new">New</span>
        ) : null}

        <span className="label-discount">{product.discountPercent}%</span>
      </Link>
    </Lazyload>
  );
};

export default ProductItem;
