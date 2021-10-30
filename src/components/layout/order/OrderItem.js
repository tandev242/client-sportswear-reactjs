import React from "react";
import { Link } from "react-router-dom";
const OrderItem = () => {
  return (
    <div>
      <div className="order-item__heading">
        <h4 className="order-item__heading-id">
          Mã đơn hàng : 65dg45ggg233t2t3ewjh42hh15hh6
        </h4>
        <h4 className="order-item__heading-status">Hoàn tất giao hàng</h4>
      </div>
      <div className="order-item__body">
        {/* Đây là danh sách các sản phẩm trong đơn hàng đó */}
        <ul className="order-item__body-list-item">
          <li className="item">
            <Link to="" className="item-link">
              <div className="photo">
                <img
                  src={
                    require("../../../assets/images/products/adidas/a1.jpg")
                      .default
                  }
                  alt=""
                />
              </div>
              <div className="content">
                <h5 className="content__name">
                  PUMA ULTRA 1.3 PRO CAGE TT FASTER FOOTBALL - SUNBLAZE/PUMA
                  WHITE/BLUEMAZING
                </h5>
                <p className="content__size">Size: 43</p>
                <p className="content__quantity">Số lượng : 1</p>
              </div>
              <div className="price">
                <p className="price__old">₫1.490.000</p>
                <p className="price__current">₫1.490.000</p>
              </div>
            </Link>
          </li>
          <li className="item">
            <Link to="" className="item-link">
              <div className="photo">
                <img
                  src={
                    require("../../../assets/images/products/adidas/a1.jpg")
                      .default
                  }
                  alt=""
                />
              </div>
              <div className="content">
                <h5 className="content__name">
                  PUMA ULTRA 1.3 PRO CAGE TT FASTER FOOTBALL - SUNBLAZE/PUMA
                  WHITE/BLUEMAZING
                </h5>
                <p className="content__size">Size: 43</p>
                <p className="content__quantity">Số lượng : 1</p>
              </div>
              <div className="price">
                <p className="price__old">₫1.490.000</p>
                <p className="price__current">₫1.490.000</p>
              </div>
            </Link>
          </li>
        </ul>
        {/* .................. */}
        <div className="summary">
          <div className="summary-payments">Hình thức thanh toán: COD</div>
          <div className="summary-money">
            <span className="summary-money__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-cash-stack"
                viewBox="0 0 16 16"
              >
                <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
              </svg>
            </span>
            <p className="summary-money__content">Tổng số tiền:</p>
          </div>
          <p className="summary-price">₫1.490.000</p>
        </div>
        {/* Button để hủy đơn nếu trong quá trình vận chuyển muốn hoàn lại */}
        {/* <div className="button">
                          <div className="btn btn-cancel">Hủy</div>
                        </div> */}
      </div>
    </div>
  );
};

export default OrderItem;
