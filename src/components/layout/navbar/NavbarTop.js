import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";

const NavbarTop = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [searchText, setSearchText] = useState("");
  // Handle logout => clear token
  const handleLogOut = () => {
    const confirmLogOut = window.confirm(
      "Bạn có chắc chắn muốn đăng xuất không?"
    );
    if (confirmLogOut) {
      dispatch(logout());
    }
  };
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleMenu = () => {
    const mobileMenu = document.querySelector(".navbar-bottom__list");
    if (isMenuOpen) {
      mobileMenu.classList.remove("open-menu");
      setMenuOpen(false);
    } else {
      mobileMenu.classList.add("open-menu");
      setMenuOpen(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText === "") {
      alert("Vui lòng nhập vào từ khóa cần tìm !");
    } else {
      history.push(`/collections/search?text=${searchText}`);
    }
  };

  return (
    <div className="navbar-top">
      <div className="mobile-menu" onClick={() => handleMenu()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </div>
      <div className="navbar-top__logo">
        <NavLink to={`/`} className="navbar-top__logo-link">
          <img
            src={require("../../../assets/logo/DOUBLE T SPORT.png").default}
            alt=""
          />
        </NavLink>
      </div>
      <form className="navbar-top__search" onSubmit={(e) => handleSearch(e)}>
        <input
          className="navbar-top__search-input"
          placeholder="Tìm kiếm ..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="navbar-top__search-icon" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </form>
      <div className="navbar-top__user">
        {/* navbar-top__user-info--define : define
        navbar-top__user-info--undefine : undefine */}

        <div className="navbar-top__user-info navbar-top__user-info--define">
          {auth.authenticate ? (
            <NavLink to="/account">
              <img src={auth.user.profilePicture} alt="" />
            </NavLink>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>
          )}

          <div className="navbar-top__user-info-box">
            {auth.authenticate ? (
              <ul className="list">
                <li className="box-item">
                  <NavLink to={`/account`} className="link">
                    Tài khoản: {auth.user.name}
                  </NavLink>
                </li>

                <li className="box-item">
                  <NavLink to={`/order`} className="link">
                    Tra cứu đơn hàng
                  </NavLink>
                </li>
                <li className="box-item">
                  <NavLink
                    to="/"
                    className="link"
                    onClick={() => handleLogOut()}
                  >
                    Đăng xuất
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="list">
                <li className="box-item">
                  <NavLink to={`/login`} className="link">
                    Đăng nhập
                  </NavLink>
                </li>
                <li className="box-item">
                  <NavLink to={`/order`} className="link">
                    Tra cứu đơn hàng
                  </NavLink>
                </li>
                <li className="box-item">
                  <NavLink to={`/register`} className="link">
                    Đăng ký
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>

        <NavLink to="/cart" className="navbar-top__user-cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-cart3"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <span className="quantity">{cartItems.length || 0}</span>
          <div className="navbar-top__user-cart-box">
            <h4 className="title">Giỏ hàng</h4>

            {cartItems.length > 0 ? (
              <div className="body">
                {cartItems.map((item, index) => (
                  <div className="item" key={index}>
                    <img
                      src={item.product?.productPictures[0].img}
                      alt={item.product?.name}
                      className="item-img"
                    />
                    <div className="item-body">
                      <h5 className="name">{item.product?.name}</h5>
                      <p className="size">
                        Size: {item.size.size} - Số lượng : {item.quantity}
                      </p>
                    </div>
                    <div className="item-price">
                      ₫
                      {new Intl.NumberFormat("de-DE").format(
                        (item.product?.price -
                          (item.product?.discountPercent / 100) *
                          item.product?.price) *
                        item.quantity
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="body">
                <div className="body-cart-empty">
                  Giỏ hàng của bạn đang trống. Hãy sắm cho mình mẫu giày, phụ
                  kiện ưng ý nhất!
                </div>
              </div>
            )}
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default NavbarTop;
