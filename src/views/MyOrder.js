import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/layout/Layout";
import OrderItem from "../components/layout/order/OrderItem";
const MyOrder = () => {
  const orders = useSelector((state) => state.order);
  console.log(orders);
  return (
    <Layout>
      <div className="account">
        <div className="container mgb-45">
          <div className="row">
            <div className="col-12">
              <div className="account-wrapper__order">
                <div className="account-wrapper__order__heading">
                  <h3>Đơn hàng</h3>
                  <div className="status-sort">
                    <span className="status-sort-label">Trạng thái: </span>
                    <select name="" id="">
                      <option value="">Tất cả</option>
                      <option value="">Chờ xác nhận</option>
                      <option value="">Đang đóng gói</option>
                      <option value="">Đang vận chuyển</option>
                      <option value="">Giao hàng thành công</option>
                      <option value="">Đơn hàng đã hủy</option>
                    </select>
                  </div>
                </div>
                <div className="account-wrapper__order__body">
                  {/* 1 đơn hàng trong list các đơn hàng */}
                  <OrderItem orders={orders} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyOrder;
