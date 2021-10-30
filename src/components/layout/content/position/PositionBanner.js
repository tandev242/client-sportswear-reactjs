import React from "react";
import { Link } from "react-router-dom";
const CategoryMainBanners = [
  {
    img: require("../../../../assets/images/banner/position_banner_4.jpg")
      .default,
    title: "Tiền đạo",
    description: "Dứt điểm, chính xác ",
  },
  {
    img: require("../../../../assets/images/banner/position_banner_3.jpg")
      .default,
    title: "Tiền vệ cánh",
    description: "Tốc độ, đột phá",
  },
  {
    img: require("../../../../assets/images/banner/position_banner_2.jpg")
      .default,
    title: "Tiền vệ trung tâm",
    description: "Kiểm soát, chuyền bóng",
  },
  {
    img: require("../../../../assets/images/banner/position_banner_1.jpg")
      .default,
    title: "Hậu vệ",
    description: "Phòng ngự, chắc chắn",
  },
];

const PositionBanner = () => {
  return (
    <div className="banner mgb-45 seperate">
      <h3 className="banner__heading">Chọn giày theo vị trí</h3>
      <div className="row ">
        {CategoryMainBanners.map((item) => {
          return (
            <div className="col-3 ">
              <Link to="/collections/category/all" className="banner-3 mgb-30">
                <img className="banner-3__img" src={item.img} alt="" />
                <div className="banner-3__body">
                  <h4 className="banner-3__body-title">{item.title}</h4>
                  <span className="banner-3__body-description">
                    {item.description}
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PositionBanner;
