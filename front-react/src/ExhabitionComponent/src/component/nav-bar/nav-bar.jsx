import "./nav-bar-styles.css";
import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { images } from "../images";
import React, { useState } from "react";
import Footer from "../footer/footer-component";
const menu = ["خانه ", "در باره ما", "پروفایل من"];

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <Fragment>
      <div>
        <img
          className="menu-icon"
          src={images["menue-icon.png"]}
          onClick={showSidebar}
        />
        <div className={sidebar ? "navbar-section ac " : "navbar-section dl"}>
          <img
            className="close-navbar"
            src={images["close-icon.png"]}
            onClick={showSidebar}
          />
          <div className="menu">
            <Link to="/exhibitions" className="menu-item">
              خانه
            </Link>

            <Link to="/" className="menu-item">
              درباره ما
            </Link>
            <Link to="/requests" className="menu-item">
              درخواست ها
            </Link>
          </div>
          <div className="inner-addon">
            <input type="text" />
            <i className="icon-bar"></i>
          </div>
        </div>
        
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
