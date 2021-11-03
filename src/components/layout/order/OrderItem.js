import React from "react";
import { Link } from "react-router-dom";
const OrderItem = (props) => {
  const { orders } = props.orders;
  console.log(orders);
  const orderStatus = (order) => {
    const status = order.orderStatus.find((item) => item.isCompleted === true);
    switch (status.type) {
      case "ordered":
        return "Đã đặt hàng";

      case "packed":
        return "Đã đóng gói";

      case "shipped":
        return "Đang giao hàng";
      case "delivered":
        return "Đã giao thành công";
    }
  };
  return (
    <>
      {orders.map((order) => (
        <div className="order-item">
          <div className="order-item__heading">
            <h4 className="order-item__heading-id">
              Mã đơn hàng : {order._id}
            </h4>
            <h4 className="order-item__heading-status">{orderStatus(order)}</h4>
          </div>
          <div className="order-item__body">
            {/* Đây là danh sách các sản phẩm trong đơn hàng đó */}
            <ul className="order-item__body-list-item">
              {order.items.map((item) => (
                <li className="item">
                  <Link to="" className="item-link">
                    <div className="photo">
                      <img
                        src={item.productId.productPictures[0].img}
                        alt={item.productId.name}
                      />
                    </div>
                    <div className="content">
                      <h5 className="content__name">{item.productId.name}</h5>
                      <p className="content__size">Size: {item.sizeId.size}</p>
                      <p className="content__quantity">
                        Số lượng : {item.purchaseQty}
                      </p>
                    </div>
                    <div className="price">
                      <p className="price__old">
                        ₫
                        {new Intl.NumberFormat("de-DE").format(
                          item.productId?.price
                        )}
                      </p>
                      <p className="price__current">
                        ₫
                        {new Intl.NumberFormat("de-DE").format(
                          item.productId?.price -
                            (item.productId?.discountPercent / 100) *
                              item.productId?.price
                        )}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {/* .................. */}
            <div className="summary">
              <div className="summary-payments">
                Hình thức thanh toán: <span>{order.paymentType}</span>
              </div>
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
              <p className="summary-price">
                ₫{new Intl.NumberFormat("de-DE").format(order.totalAmount)}
              </p>
            </div>
            {/* Button để hủy đơn nếu trong quá trình vận chuyển muốn hoàn lại */}
            {/* <div className="button">
                          <div className="btn btn-cancel">Hủy</div>
                        </div> */}
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderItem;
