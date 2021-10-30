import React from "react";
import NavbarTop from "./NavbarTop";
import NavbarBottom from "./NavbarBottom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const category = useSelector((state) => state.category);
  const brand = useSelector((state) => state.brand);

  return (
    <div className="navbar">
      <div className="container">
        <NavbarTop />
        <NavbarBottom categories={category.categories} brands={brand.brands} />
      </div>
    </div>
  );
};

export default Navbar;
