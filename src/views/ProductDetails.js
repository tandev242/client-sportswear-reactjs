import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import Slider from "react-slick";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../features/product/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import { getRecommendRelateProduct } from "../features/recommend/recommendSlice";
import { confirmAlert } from "react-confirm-alert";
import Comments from "../components/layout/comments/Comments";
import behaviorAPI from "../api/behaviorAPI";
import ProductItem from "../components/layout/product/ProductItem";
import Loading from "../components/layout/loading/Loading";
import { Stack } from "@material-ui/core";

const ProductDetails = () => {

  let match = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const [product, setProduct] = useState({
    _id: "",
    discountPercent: "",
    name: "",
    slug: "",
    price: "",
    description: "",
    reviews: [],
  });
  const [slideSub, setSlideSub] = useState();
  const [slidePhotos, setSlidePhotos] = useState();
  const [openDescription, setOpenDescription] = useState(true);
  const { cartItems } = useSelector((state) => state.cart);
  const [isAddedComment, setIsAddedComment] = useState(false);
  const [recommendList,setRecommendList] = useState([]);
  const [isLoading,setLoading] = useState(false)
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
    const fetchProductBySlug = async () => {
      setLoading(true);
      const { slug } = match.params;
      const res = await dispatch(getProductBySlug(slug)).unwrap();
      setProduct(res.data.product);
      behaviorAPI.addBehavior({ product: res.data.product._id, type: "view" })
      let reqBody = {
        id: res.data.product._id
      }
      const resp =  await dispatch(getRecommendRelateProduct(reqBody)).unwrap();
      if(resp.status === 200){
        await setRecommendList(resp.data.products)
      }
      setLoading(false);
    };
    fetchProductBySlug();
  }, [isAddedComment,match.params.slug]);

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

  const slide = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    adapterHeight: true,
    focusOnSelect: true,
  }
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
    setOpenDescription(!openDescription);
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
      history.push({
        pathname: "/checkout",
        state: order,
      });
    }
  };
  // Handle add cart
  const handleAddCart = async () => {
    if (cartItem.size._id === undefined || cartItem.quantity === 0) {
      alert("Kiểm tra kích thước giày và số lượng muốn mua.");
    } else if (auth.authenticate === false) {
      routeChange("/login");
    } else {
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
        behaviorAPI.addBehavior({ product: cartObject.product._id, type: "addToCart" })
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

        const res = await dispatch(addToCart(cart))
        if(res.error){
          alert("Không đủ số lượng sản phẩm trong kho !")
          return;
        }
        pageRedirects();
      }
    }
  };
  // Show confirm alert to redirect

  const getStarStyle = (product) => {
    let ratingTotal = 0;
    let ratingAdv = 0;
    if(product.reviews.length > 0){
      for(let item of product.reviews){
        ratingTotal += item.rating ;
      }
      ratingAdv = ratingTotal/product.reviews.length;
    }
    let percentClip = 100 - ratingAdv * 20;
    let starStyle = {
      clipPath: `inset(0 ${percentClip}% 0 0)`,
    }
    return starStyle;
  }

  if (Object.keys(product).length === 0) {
    return null;
  }
 
  return (
    
    <Layout>
      {
      isLoading ? 
      <Stack
        sx={{
          width: "100%",
          height: "3000px",
          backgroundColor: "#74737361",
          position: "absolute",
          zIndex: 5,
        }}>
        <Loading />
      </Stack> :
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
                        {product.productPictures?.map((image) => (
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
                        {product.productPictures?.map((image) => (
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
                  <h3>{product?.name}</h3>
                </div>
                <div className="rating-result">
                  <div className="rating">
                    <div className="star">
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                          </svg>
                        </label>
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                          </svg>
                        </label>
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                          </svg>
                        </label>
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                          </svg>
                        </label>
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                          </svg>
                        </label>
                        <div className="star-1" style = {getStarStyle(product)}>
                          <label>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                          </label>
                          <label>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                          </label>
                          <label>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                          </label>
                          <label>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                          </label>
                          <label>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="seperate">

                    </div>
                    <div className="review-count">
                      {product.reviews.length ? `${product.reviews.length} đánh giá` : 'Chưa có đánh giá cho sản phẩm này'}
                    </div>
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
                  <p className="body-brand__name">{product.brand?.name}</p>
                </div>
                <div className="body-size">
                  <div className="body-size__label">
                    <p>Size</p>
                    <Link to="/size-choose">(Hướng dẫn chọn size)</Link>
                  </div>
                  <div className="body-size__options">
                    {product.sizes?.map((size) => (
                      <label
                        htmlFor={size.size._id}
                        className=  "body-size__options-item"
                      >
                        <input
                          type="radio"
                          className="body-size__options-item__input"
                          name="size"
                          id={size.size._id}
                          value={size.size._id}
                          required
                          disabled = {size.quantity === 0 ? true : false}
                          onChange={() => handleChangeSize(size.size)}
                        />
                        <div className={ size.quantity === 0 ? "body-size__options-item__label disable-option" : "body-size__options-item__label"}>
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
          <div className="row mgt-20">
            <div className="col-12">
              <Comments
                product={product}
                isAddedComment={isAddedComment}
                setIsAddedComment={setIsAddedComment}
              />
            </div>
          </div>
          <div className="hot-product mgb-45">
            <h3 className="hot-product__heading ">SẢN PHẨM LIÊN QUAN</h3>
            <Slider {...slide}>
              {recommendList.map((product) => {
                return (
                  <div className="col-2-4">
                    <ProductItem product={product} />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    }
    </Layout>
  );
};

export default ProductDetails;
