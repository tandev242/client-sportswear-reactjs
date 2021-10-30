import React from "react";
import { NavLink } from "react-router-dom";

const NavbarLeft = (props) => {
  const { categories, brands, sizes, filter, setFilter } = props;

  const onSetFilter = (e, type) => {
    if (type === "price") {
      if (filter.price.find(element => element === e.target.value)) {
        const priceArr = filter.price;
        priceArr.splice(priceArr.indexOf(e.target.value), 1);
        setFilter({ ...filter, price: priceArr });
      } else {
        setFilter({ ...filter, price: [...filter.price, e.target.value] })
      }
    } else {
      if (filter.sizes.find(element => element === e.target.value)) {
        const sizeArr = filter.sizes;
        sizeArr.splice(sizeArr.indexOf(e.target.value), 1);
        setFilter({ ...filter, sizes: sizeArr });
      } else {
        setFilter({ ...filter, sizes: [...filter.sizes, e.target.value] })
      }
    }
  }

  return (
    <div className="navbar-left">
      <h3 className="navbar-left__heading">Danh mục sản phẩm</h3>
      <ul className="navbar-left-category">
        {categories.map((category) => (
          <li className="navbar-left-category__item">
            <NavLink
              to={`/collections/category/${category.slug}`}
              className="navbar-left-category__item-link"
            >
              {category.name}
              {category.children.length !== 0 ? (
                <span className="add">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              ) : null}
              <ul className="sub-category">
                {category.children.map((child) => (
                  <li className="sub-category__item">
                    <NavLink
                      to={`/collections/category/${child.slug}`}
                      className="navbar-left-category__item-link"
                    >
                      {child.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </NavLink>
          </li>
        ))}
      </ul>
      <h3 className="navbar-left__heading">Thương hiệu</h3>
      <ul className="navbar-left-category">
        {brands.map((brand) => (
          <li className="navbar-left-category__item">
            <NavLink
              to={`/collections/brand/${brand.slug}`}
              className="navbar-left-category__item-link"
            >
              {brand.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <h3 className="navbar-left__heading">Tìm theo</h3>
      <div className="navbar-left-price">
        <h5 className="navbar-left-price__heading">Giá sản phẩm</h5>
        <div className="navbar-left-price__options">
          <input type="checkbox" name="s" id="s" value="from0to1" onChange={(e) => onSetFilter(e, "price")} />
          <label htmlFor="s"> Từ 0 ~ ₫1.000.000</label>
        </div>
        <div className="navbar-left-price__options">
          <input type="checkbox" name="m" id="m" value="from1to2" onChange={(e) => onSetFilter(e, "price")} />
          <label htmlFor="m"> Từ ₫1.000.000 ~ ₫2.000.000</label>
        </div>
        <div className="navbar-left-price__options">
          <input type="checkbox" name="l" id="l" value="from2to3" onChange={(e) => onSetFilter(e, "price")} />
          <label htmlFor="l"> Từ ₫2.000.000 ~ ₫3.000.000</label>
        </div>
        <div className="navbar-left-price__options">
          <input type="checkbox" name="xl" id="xl" value="more3" onChange={(e) => onSetFilter(e, "price")} />
          <label htmlFor="xl"> Từ ₫3.000.000 trở lên</label>
        </div>
      </div>
      <div className="navbar-left-sizes">
        <h5 className="navbar-left-sizes__heading">Size</h5>
        {sizes.map((size) => (
          <div className="navbar-left-sizes__options">
            <input type="checkbox" name={size.size} id={size._id} value={size._id} onChange={(e) => onSetFilter(e, "sizes")} />
            <label htmlFor={size._id}> {size.size}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavbarLeft;
