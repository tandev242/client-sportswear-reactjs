import React from "react";

const PolicyList = [
  {
    img: require("../../../../assets/images/policy/policy_new_image_1.png")
      .default,
    title: "Giao hàng siêu tốc",
    description: " Giao hàng nội thành TP.HCM trong vòng 1 --> 2 tiếng",
  },
  {
    img: require("../../../../assets/images/policy/policy_new_image_2.png")
      .default,
    title: "Tư vấn online 24/7",
    description:
      " Đội ngũ CSKH tư vấn 24/7 qua Hotline, Facebook, Zalo, Instagram",
  },
  {
    img: require("../../../../assets/images/policy/policy_new_image_3.png")
      .default,
    title: "Đổi hàng linh hoạt",
    description: " Đổi hàng trong vòng 7 ngày với sản phẩm chưa sử dụng",
  },
  {
    img: require("../../../../assets/images/policy/policy_new_image_4.png")
      .default,
    title: "Quà tặng hấp dẫn",
    description: " Nhiều quà tặng hấp dẫn khi hàng tại DOUBLE T SPORT",
  },
  {
    img: require("../../../../assets/images/policy/policy_new_image_5.png")
      .default,
    title: "Thanh toán tiện lợi",
    description:
      " Thanh toán tiện lợi bằng tiền mặt, chuyển khoản, thẻ ngân hàng, Visa/Master card, ví Momo...",
  },
];
const Policy = () => {
  return (
    <div className="policy mgb-45">
      <div className="container">
        <div className="row">
          {PolicyList.map((item) => (
            <div className="col-2-4 col-seperate">
              <div className="policy-item">
                <img
                  className="policy-item__img"
                  src={item.img}
                  alt={item.title}
                />
                <div className="policy-item__body">
                  <h4 className="policy-item__body-title">{item.title}</h4>
                  <span className="policy-item__body-description">
                    {item.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Policy;
