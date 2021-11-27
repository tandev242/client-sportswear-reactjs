import React from "react";
import CategoryBanner from "./category/CategoryBanner";
import HotProduct from "./products/HotProduct";
import BrandBanner from "./brand/BrandBanner";
import PositionBanner from "./position/PositionBanner";
const Content = ({ brand, category }) => {
  return (
    <div className="content">
      <div className="container">
        <HotProduct />
        <CategoryBanner category={category} />
        <BrandBanner brand={brand} />
        <PositionBanner />
      </div>
    </div>
  );
};

export default Content;
