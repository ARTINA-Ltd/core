import "./nav-bar-styles.css";
import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { images } from "../ExhabitionComponent/src/component/images";
import React, { useState } from "react";
import Logo from "../mehdizade_project/starter_file/calligraphy/src/images/footer/logo.png"

const menu = ["ورود/ثبت نام","خانه ", "در باره ما", "پروفایل من"];

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <Fragment>
    <div className="container1">
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
    
          <Link to="/loginpage" className="menu-item">
            ورود
          </Link>
          <Link to="/requests" className="menu-item">
            درخواست ها
          </Link>
        </div>
        <div className="inner-addon">
        <Link to={"/"} > <button className="walletconnect">اتصال به کیف پول</button></Link>
                               <img className="logo" src={Logo} alt="" />
        </div>
      </div>
    </div>
    <Outlet />
    </Fragment>
    
  );
};

export default Navbar;
