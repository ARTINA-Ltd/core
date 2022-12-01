import "./nav-bar-styles.css";
import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { images } from "../../../../../ExhabitionComponent/src/component/images";
import React, { useState } from "react";

const menu = ["ورود/ثبت نام","خانه ", "در باره ما", "پروفایل من"];

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <Fragment>
      <div >
        <img
          className="menu-icon"
          src={images["menue-icon.png"]}
          onClick={showSidebar}
        />
        {/* sidebar ? "navbar-section ac " : */}
        <div className={"navbar-section dl"}>
          <img
            className="close-navbar"
            src={images["close-icon.png"]}
            onClick={showSidebar}
          />
          <div className="menu">
            <Link to="/" className="menu-item">
              خانه
            </Link>

            <Link to="/" className="menu-item text-md-center">
              درباره ما
            </Link>
            <Link to="/exhibitionsignform" className="menu-item">
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
