import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import { settings } from "../components/toasts/settingToast";
import {
  getCartItems,
  addToCart,
  removeCartItem,
} from "../features/cart/cartSlice";

const Cart = () => {
  const [selected, setSelected] = useState([]);
  const { cartItems } = useSelector((state) => state.cart);
  const { deliveryInfo } = useSelector((state) => state.deliveryInfo);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  // Handle quantity of product
  const handleChangeQuantity = (quantity, productId, sizeId) => {
    const cartItem = {
      product: productId,
      size: sizeId,
      quantity: quantity,
    };
    const cart = { cartItems: [cartItem] };
    if (quantity > 0) {
      dispatch(addToCart(cart));
    } else {
      alert("Số lượng sản phẩm không thể nhỏ hơn 1");
    }
  };

  // Handle remove cart item
  const removeProduct = (product, size) => {
    const confirmRemove = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này ra khỏi giỏ hàng không?"
    );
    if (confirmRemove) {
      const cartItem = { product, size };
      dispatch(removeCartItem({ cartItem }));
      const newSelected = selected.filter((newItem) => {
        return newItem.product._id !== product || newItem.size._id !== size;
      });
      setSelected(newSelected);
    }
  };
  const handleSelectedAll = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelected(cartItems);
    } else {
      setSelected([]);
    }
  };
  // Handle selected items which customer want to payment
  const handleSelected = (e, item) => {
    const isChecked = e.target.checked; //false
    if (isChecked) {
      setSelected([...selected, item]);
    } else {
      const newSelected = selected.filter((newItem) => {
        return (
          newItem.product._id !== item.product._id ||
          newItem.size._id !== item.size._id
        );
      });
      setSelected(newSelected);
    }
  };

  // Notify

  const notify = () =>
    toast.warn("Vui lòng chọn sản phẩm muốn thanh toán !", settings);

  // Handle pass items which is selected to checkout form
  const handlePayment = (e) => {
    e.preventDefault();
    if (!deliveryInfo.address) {
      window.confirm(
        "Bạn chưa có thông tin nhận hàng! Bạn có muốn chuyển hướng đến trang thêm thông tin ?"
      ) && history.push("/account");
      return;
    }
    if (selected.length > 0) {
      history.push({
        pathname: "/checkout",
        state: selected,
      });
    } else {
      notify();
    }
  };
  // Check length of selected ===  length of cartItems ?
  const isSelectedAll = cartItems.length === selected.length;

  // Handle when user check to all item
  const itemSelected = (item) => {
    return selected.find(
      (itemSelected) =>
        itemSelected.product._id === item.product._id &&
        itemSelected.size._id === item.size._id
    );
  };
  // Handle calc total price
  const totalPrice = selected.reduce((total, priceItem) => {
    total +=
      (priceItem.product?.price -
        (priceItem.product?.discountPercent / 100) * priceItem.product?.price) *
      priceItem.quantity;
    return total;
  }, 0);

  return (
    <Layout>
      {/* <CartContainer /> */}
      <div className="cart">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <h3> Không có sản phẩm !!!</h3>
              <Link to="/" className="btn back-home">
                Mua ngay
              </Link>
            </div>
          ) : (
            <div className="row  mgb-45">
              <div className="col-12">
                <div className="cart-wrapper">
                  <div className="cart-header">
                    <h3>Giỏ hàng</h3>
                  </div>
                  <form action="" className="cart-form">
                    <table className="cart-form-table">
                      <thead>
                        <tr>
                          <th className="checkbox">
                            <input
                              type="checkbox"
                              name="selectAll"
                              checked={isSelectedAll ? true : false}
                              onChange={handleSelectedAll}
                            />
                          </th>
                          <th className="image"></th>
                          <th className="name">Tên sản phẩm</th>
                          <th className="quantity">Số lượng</th>
                          <th className="price">Giá tiền</th>
                          <th className="remove"></th>
                        </tr>
                      </thead>
                    </table>
                    <div className="scroll-table">
                      <table className="cart-form-table">
                        <tbody>
                          {cartItems.map((item, index) => (
                            <tr key={index}>
                              <td className="checkbox">
                                <input
                                  type="checkbox"
                                  checked={itemSelected(item) ? true : false}
                                  value={item}
                                  onChange={(e) => handleSelected(e, item)}
                                />
                              </td>
                              <td className="image">
                                <Link
                                  to={`/product/${item.product.slug}`}
                                  className="image-link"
                                >
                                  <img
                                    src={item.product?.productPictures[0].img}
                                    alt=""
                                  />
                                </Link>
                              </td>

                              <td className="name">
                                <Link
                                  to={`/product/${item.product.slug}`}
                                  className="name-link"
                                >
                                  <p className="name-link-text">
                                    {item.product?.name}
                                  </p>
                                  <p className="name-link-size">
                                    Size: {item.size?.size}
                                  </p>
                                </Link>
                              </td>
                              <td className="quantity">
                                <input
                                  className="quantity-ip"
                                  type="number"
                                  name=""
                                  id=""
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleChangeQuantity(
                                      e.target.value,
                                      item.product._id,
                                      item.size._id
                                    )
                                  }
                                />
                              </td>
                              <td className="price">
                                <p>
                                  ₫
                                  {new Intl.NumberFormat("de-DE").format(
                                    (item.product?.price -
                                      (item.product?.discountPercent / 100) *
                                      item.product?.price) *
                                    item.quantity
                                  )}
                                </p>
                              </td>
                              <td className="remove">
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeProduct(
                                      item.product._id,
                                      item.size._id
                                    )
                                  }
                                  className="remove-btn"
                                >
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <table className="cart-form-table">
                      <tbody>
                        <tr className="summary">
                          <td className="checkbox"></td>
                          <td className="image"></td>
                          <td className="name"></td>
                          <td className="summary-label">Tổng cộng : </td>
                          <td className="price">
                            <p>
                              ₫
                              {new Intl.NumberFormat("de-DE").format(
                                totalPrice
                              )}
                            </p>
                          </td>
                          <td className="remove"></td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="row">
                      <div className="col-6">
                        <div className="cart-form-notes">
                          <p className="cart-form-notes__title">Ghi chú</p>
                          <textarea
                            className="cart-form-notes__content"
                            name="note"
                            rows="5"
                            cols="10"
                            maxLength="200"
                            placeholder="Tối đa 200 kí tự!"
                          ></textarea>
                        </div>
                        <div className="cart-form-collections">
                          <Link to="/collections/category/all">
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-box-arrow-left"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                                />
                                <path
                                  fill-rule="evenodd"
                                  d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                                />
                              </svg>
                            </span>
                            Tiếp tục mua sắm
                          </Link>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="cart-form-btn">
                          <button
                            className="btn cart-form-btn__payment"
                            onClick={(e) => handlePayment(e)}
                          >
                            Thanh toán
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Cart;
