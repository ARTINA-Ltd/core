import "./nav-bar-styles.css";
import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { images } from "./../../../../../../src/ExhabitionComponent/src/component/images";
import React, { useState } from "react";

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
            <Link to="/" className="menu-item">
              خانه
            </Link>

            <Link to="/requests" className="menu-item">
             درخواست ها
            </Link>
            <Link to="/loginpage" className="menu-item">
              ورود
            </Link>
          </div>
          <div className="inner-addon">
            <input type="text" />
            <i class="icon-bar"></i>
          </div>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
