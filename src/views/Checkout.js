import React, { useState, useEffect } from "react";
import { Select, FormControl, MenuItem, InputLabel } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { paymentWithMomo, addOrder } from "../features/order/orderSlice";
import behaviorAPI from "../api/behaviorAPI";

const Checkout = (props) => {
  const orderItems = props.location.state;
  const { deliveryInfo } = useSelector((state) => state.deliveryInfo);
  const [address, setAddress] = useState(null);
  const [paymentType, setPaymentType] = useState("cod");

  const totalPrice = orderItems.reduce((total, priceItem) => {
    total +=
      (priceItem.product?.price -
        (priceItem.product?.discountPercent / 100) * priceItem.product?.price) *
      priceItem.quantity;
    return total;
  }, 0);
  const shippingFee = 30000;
  const totalAmount = totalPrice + shippingFee;
  const dispatch = useDispatch();
  const history = useHistory();

  const setDefaultDeliveryInfo = () => {
    if (deliveryInfo.address) {
      const defaultAddress = deliveryInfo.address.find(
        (add) => add.isDefault === true
      );
      if (defaultAddress) {
        setAddress(defaultAddress);
      } else {
        setAddress(deliveryInfo.address[0]);
      }
    }
  };

  useEffect(() => {
    setDefaultDeliveryInfo();
  }, [deliveryInfo]);

  const handleChange = (e) => {
    const newAddress = deliveryInfo.address.find(
      (add) => add._id === e.target.value
    );
    setAddress(newAddress);
  };

  const getItemsToPay = () => {
    const items = [];
    orderItems.map((item) => {
      items.push({
        productId: item.product._id,
        sizeId: item.size._id,
        payablePrice:
          (item.product.price -
            (item.product.discountPercent / 100) * item.product.price) *
          item.quantity,
        purchaseQty: item.quantity,
      });
    });
    return items;
  };

  // Handle payment
  const handlePayment = async () => {
    const order = {
      addressId: address._id,
      totalAmount,
      paymentStatus: "pending",
      paymentType,
      items: getItemsToPay(),
    };
    if (paymentType === "cod") {
      try{
        var res = await dispatch(addOrder(order)).unwrap()
      }catch(error){
        alert("S??? l?????ng s???n ph???m trong kho kh??ng ????? ! Vui l??ng ch???n s???n ph???m kh??c")
        history.goBack(-1)
        return;
      }
      if (res.status === 201) {
        order.items.forEach((item) => {
          behaviorAPI.addBehavior({ product: item.productId, type: "buy" })
        })
        alert("?????t h??ng th??nh c??ng!")
        history.replace("/cart")
      }
    } else if (paymentType === "card") {
      const res = await dispatch(paymentWithMomo({ order })).unwrap()
      const url = res.data.url
      if (url) {
        window.location.href = url
      } else {
        alert("Hi???n t???i kh??ng th??? thanh to??n b???ng h??nh th???c n??y !")
      }
    }
  };

  if (!deliveryInfo.address || !address) {
    return null;
  }

  return (
    <div className="checkout">
      <div className="container">
        <div className="row ">
          <div className="col-12">
            <div className="wrapper mgt-20 mgb-45">
              <div className="wrapper__heading">
                <div className="wrapper__heading-logo">DoubleT Sport</div>
                <h3 className="wrapper__heading-title">Thanh to??n</h3>
              </div>
              <div className="wrapper__body">
                <div className="row">
                  <div className="col-6">
                    <div className="wrapper__body-info">
                      <h5 className="wrapper__body-info__title">
                        Th??ng tin giao h??ng
                      </h5>
                      <div className="wrapper__body-info__body">
                        {/* <div className="photo">
                          <img src={deliveryInfo.user.profilePicture} alt="" />
                        </div> */}
                        <div className="information">
                          <div className="information-name">
                            T??n ng?????i nh???n: {address.name}
                          </div>
                          <div className="information-phone">
                            S??T ng?????i nh???n: {address.phoneNumber}
                          </div>
                        </div>
                      </div>
                      <div className="wrapper__body-info__address">
                        <FormControl sx={{ m: 1, minWidth: 540 }}>
                          <InputLabel id="address-user-label">
                            ?????a ch???
                          </InputLabel>
                          <Select
                            labelId="address-user-label"
                            id="address-user"
                            value={address._id}
                            onChange={(e) => handleChange(e)}
                            label={address.address}
                            sx={{ width: 540 }}
                            variant="standard"
                          >
                            {deliveryInfo.address.map((info) => (
                              <MenuItem value={info._id}>
                                {info.address}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="wrapper__body-info__payments">
                        <h5 className="payments-title">
                          Ph????ng th???c thanh to??n
                        </h5>
                        <label htmlFor="byCash" className="radio">
                          <input
                            type="radio"
                            name="payments-radio"
                            id="byCash"
                            className="radio__input"
                            checked={paymentType === "cod"}
                            onChange={() => setPaymentType("cod")}
                          />
                          <div className="radio__radio"></div>
                          Thanh to??n khi nh???n h??ng
                        </label>
                        <label htmlFor="byCreditCart" className="radio">
                          <input
                            type="radio"
                            name="payments-radio"
                            id="byCreditCart"
                            className="radio__input"
                            checked={paymentType === "card"}
                            onChange={() => setPaymentType("card")}
                          />
                          <div className="radio__radio"></div>
                          Thanh to??n tr???c tuy???n(Momo)
                        </label>
                      </div>
                      <div className="wrapper__body-info__btn row">
                        <button
                          className="btn-pay btn"
                          onClick={() => handlePayment()}
                        >
                          Thanh to??n
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="wrapper__body-orders">
                      <h5 className="wrapper__body-orders__title">S???n ph???m</h5>
                      <ul className="wrapper__body-orders__list">
                        {orderItems.map((orderItem, index) => (
                          <li
                            className="wrapper__body-orders__list-item"
                            key={index}
                          >
                            <div className="photo">
                              <img
                                src={orderItem.product.productPictures[0].img}
                                alt=""
                              />
                              <span className="quantity-label">
                                {orderItem.quantity}
                              </span>
                            </div>
                            <div className="content">
                              <h6 className="name">{orderItem.product.name}</h6>
                              <p className="size">
                                Size: {orderItem.size.size}
                              </p>
                            </div>
                            <div className="price">
                              <p>
                                ???
                                {new Intl.NumberFormat("de-DE").format(
                                  (orderItem.product.price -
                                    (orderItem.product.discountPercent / 100) *
                                    orderItem.product.price) *
                                  orderItem.quantity
                                )}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="wrapper__body-orders__summary">
                        <div className="wrapper__body-orders__summary__fee">
                          <p className="text">T???m t??nh</p>
                          <p className="price">
                            ???{new Intl.NumberFormat("de-DE").format(totalPrice)}
                          </p>
                        </div>
                        <div className="wrapper__body-orders__summary__fee">
                          <p className="text">Ph?? v???n chuy???n</p>
                          <p className="price">
                            ???
                            {new Intl.NumberFormat("de-DE").format(shippingFee)}
                          </p>
                        </div>
                      </div>
                      <div className="wrapper__body-orders__total">
                        <p className="text">T???ng c???ng</p>
                        <p className="price">
                          {" "}
                          ???{new Intl.NumberFormat("de-DE").format(
                            totalAmount
                          )}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
