import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import Slider from "react-slick";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../features/product/productSlice";
import { addToCart, getCartItems } from "../features/cart/cartSlice";
import { confirmAlert } from "react-confirm-alert";
const ProductDetails = () => {
  let match = useRouteMatch();
  const { slug } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { product } = useSelector((state) => state.product);
  const [slideSub, setSlideSub] = useState();
  const [slidePhotos, setSlidePhotos] = useState();
  const [openDescription, setOpenDescription] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  // useHistory be used to redirect page
  const routeChange = (url) => {
    history.push(url);
  };

  const [cartItem, setCartItem] = useState({
    product,
    size: {},
    quantity: 1,
  });

  useEffect(() => {
    dispatch(getProductBySlug(slug));
    dispatch(getCartItems());
  }, [slug]);

  const photoSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adapterHeight: true,
    focusOnSelect: true,
  };

  const subPhotoSettings = {
    draggable: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    adapterHeight: false,
    focusOnSelect: true,
    vertical: true,
  };
  const pageRedirects = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirm">
            <h1>Bạn muốn làm gì tiếp theo ?</h1>
            <div className="btn-container">
              <button
                className="btn"
                onClick={() => {
                  onClose();
                  routeChange("/");
                }}
              >
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-left-short"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                    />
                  </svg>
                </span>
                Quay lại trang chủ
              </button>
              <button className="btn" onClick={onClose}>
                Ở lại trang
              </button>
              <button
                className="btn"
                onClick={() => {
                  onClose();
                  routeChange("/cart");
                }}
              >
                Đi đến Giỏ hàng
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-right-short"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        );
      },
    });
  };

  // Open/Close description
  const handleOpenDescription = () => {
    if (openDescription === true) setOpenDescription(false);
    else setOpenDescription(true);
  };
  // Handle change size
  const handleChangeSize = (size) => {
    setCartItem({ ...cartItem, size, product });
  };
  const handleChangeQuantity = (e) => {
    const value = e.target.value;
    if (value < 1) {
      alert("Số lượng tối thiểu là 1");
    } else {
      setCartItem({ ...cartItem, quantity: Number.parseInt(value) });
    }
  };
  // Handle pay now
  const handlePayNow = () => {
    if (cartItem.size._id === undefined || cartItem.quantity === 0) {
      alert("Kiểm tra kích thước giày và số lượng muốn mua.");
    } else if (auth.authenticate === false) {
      routeChange("/login");
    } else {
      const order = [cartItem];
      console.log(cartItem);
      history.push({
        pathname: "/checkout",
        state: order,
      });
    }
  };
  console.log(cartItem.size._id);
  // Handle add cart
  const handleAddCart = () => {
    if (cartItem.size._id === undefined || cartItem.quantity === 0) {
      alert("Kiểm tra kích thước giày và số lượng muốn mua.");
    } else if (auth.authenticate === false) {
      routeChange("/login");
    } else {
      // console.log(cart.cartItems[0].product, cartItems);
      const cartObject = cartItems.find(
        (item) =>
          item.product?._id === cartItem.product._id &&
          item.size?._id === cartItem.size._id
      );

      if (cartObject) {
        const cartExisted = {
          cartItems: [
            {
              product: cartObject.product._id,
              size: cartObject.size._id,
              quantity: cartItem.quantity + cartObject.quantity,
            },
          ],
        };
        dispatch(addToCart(cartExisted));
        pageRedirects();
      } else {
        const cart = {
          cartItems: [
            {
              product: cartItem.product._id,
              size: cartItem.size._id,
              quantity: cartItem.quantity,
            },
          ],
        };
        
        dispatch(addToCart(cart));
        pageRedirects();
      }
    }
  };
  // Show confirm alert to redirect

  if (Object.keys(product).length === 0) {
    return null;
  }

  return (
    <Layout>
      <div className="detail mgb-45">
        <div className="container">
          <div className="row mgt-20 ">
            <div className="col-6">
              <div className="photo-container">
                <div className="row">
                  <div className="col-3">
                    <div className="sub-photos">
                      <Slider
                        asNavFor={slideSub}
                        ref={(slide) => setSlidePhotos(slide)}
                        {...subPhotoSettings}
                      >
                        {product.productPictures.map((image) => (
                          <img src={image.img} alt="" />
                        ))}
                      </Slider>
                    </div>
                  </div>
                  <div className="col-9">
                    <div className="photos">
                      <Slider
                        asNavFor={slidePhotos}
                        ref={(slide) => setSlideSub(slide)}
                        {...photoSettings}
                      >
                        {product.productPictures.map((image) => (
                          <img src={image.img} alt={product.name} />
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <form className="body">
                <div className="body-heading">
                  <h3>{product.name}</h3>
                </div>
                <div className="body-price">
                  <span className="body-price__old">
                    ₫{new Intl.NumberFormat("de-DE").format(product.price)}
                  </span>
                  <span className="body-price__current">
                    ₫
                    {new Intl.NumberFormat("de-DE").format(
                      product.price -
                        (product.discountPercent / 100) * product.price
                    )}
                  </span>
                </div>
                <div className="body-brand">
                  <span className="body-brand__label">Thương hiệu: </span>
                  <p className="body-brand__name">{product.brand.name}</p>
                </div>
                <div className="body-size">
                  <div className="body-size__label">
                    <p>Size</p>
                    <Link to="/size-choose">(Hướng dẫn chọn size)</Link>
                  </div>
                  <div className="body-size__options">
                    {product.sizes.map((size) => (
                      <label
                        htmlFor={size.size._id}
                        className="body-size__options-item"
                      >
                        <input
                          type="radio"
                          className="body-size__options-item__input"
                          name="size"
                          id={size.size._id}
                          value={size.size._id}
                          required
                          onChange={() => handleChangeSize(size.size)}
                        />
                        <div className="body-size__options-item__label">
                          {size.size.size}
                          <div className="body-size__options-item__label-note">
                            <p>Gợi ý ({size.size.description})</p>
                            <p>Số lượng còn lại: {size.quantity}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="body-quantity">
                  <label
                    htmlFor="quantity-input"
                    className="body-quantity__label"
                  >
                    Số lượng
                  </label>
                  <input
                    className="body-quantity__input"
                    required
                    name="quantity-input"
                    value={cartItem.quantity}
                    onChange={handleChangeQuantity}
                    type="number"
                  />
                </div>
                <div className="body-promotion">
                  <h4 className="body-promotion__title">Khuyến mãi tặng kèm</h4>
                  <ul className="body-promotion__content">
                    <li>1 Balo đựng giày </li>
                    <li>1 Đôi vớ chống trượt</li>
                    <li>Voucher giảm 10% cho lần mua tiếp theo</li>
                  </ul>
                </div>
                <div className="body-btn">
                  {/* Tạo disable khi sản phẩm hết hàng hay vì sự cố nào đó ( btn--disable)*/}
                  <span
                    className="btn body-btn__buy"
                    onClick={() => handlePayNow()}
                  >
                    Mua ngay
                  </span>
                  <span
                    type="submit"
                    className="btn body-btn__add-to-cart "
                    onClick={() => handleAddCart()}
                  >
                    Thêm vào giỏ hàng
                  </span>
                </div>
              </form>
            </div>
          </div>
          <div className="row mgt-20 ">
            <div className="col-12">
              <div className="description">
                <div className="description-header">
                  <div
                    className="description-header__title"
                    onClick={() => handleOpenDescription()}
                  >
                    Mô tả sản phẩm
                  </div>
                  <div className="description-header__separate"></div>
                </div>
                {openDescription ? (
                  <div className="description-body">
                    {product.description ? (
                      <p>{product.description}</p>
                    ) : (
                      <p>Chưa có mô tả sản phẩm này</p>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
