import React from "react";
import CategoryBanner from "./category/CategoryBanner";
import HotProduct from "./products/HotProduct";
import RecommendedProduct from "./products/RecommendedProduct";
import BrandBanner from "./brand/BrandBanner";
import PositionBanner from "./position/PositionBanner";
import { useSelector } from "react-redux";

const Content = ({ brand, category }) => {
  const { recommendByBehaviorList } = useSelector((state) => state.recommend)
  return (
    <div className="content">
      <div className="container">
        {recommendByBehaviorList.length > 0 ?
          <RecommendedProduct products={recommendByBehaviorList} /> : null
        }
        <HotProduct />
        <CategoryBanner category={category} />
        <BrandBanner brand={brand} />
        <PositionBanner />
      </div>
    </div>
  );
};

export default Content;
