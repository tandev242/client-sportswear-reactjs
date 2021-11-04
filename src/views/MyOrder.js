import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/layout/Layout";
import OrderItem from "../components/layout/order/OrderItem";
import { getAllOrders } from "../features/order/orderSlice";

const MyOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const [status, setStatus] = useState("all");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const lastOrderStatus = (order) => {
    var orderStatusObj = null;
    order.orderStatus.forEach((status) => {
      if (status.isCompleted) {
        orderStatusObj = status;
      }
    });
    return orderStatusObj;
  };

  const filteredOrders = (arr) => {
    if (status === "all") return arr;
    const filteredArr = arr.filter((item) => {
      if (lastOrderStatus(item).type === status) return true;
      return false;
    });
    return filteredArr;
  };

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
                    <select
                      name=""
                      id=""
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="all">Tất cả</option>
                      <option value="ordered">Đã đặt hàng</option>
                      <option value="packed">Đã đóng gói</option>
                      <option value="shipped">Đang giao hàng</option>
                      <option value="delivered">Giao hàng thành công</option>
                    </select>
                  </div>
                </div>
                <div className="account-wrapper__order__body">
                  {/* 1 đơn hàng trong list các đơn hàng */}
                  {orders.length > 0 ? (
                    <OrderItem orders={filteredOrders(orders)} />
                  ) : (
                    <h1
                      style={{
                        padding: "100px",
                        color: "green",
                        fontSize: "40px",
                      }}
                    >
                      {" "}
                      HIỆN TẠI CHƯA CÓ ĐƠN HÀNG NÀO ĐƯỢC MUA
                    </h1>
                  )}
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
