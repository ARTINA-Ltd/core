import React, { useState } from "react";
import "./Header.css";
import Logo from "../../Pages/artina-logo.jpg";
import { Avatar } from "primereact/avatar";

const Header = () => {
  // const state = {clicked: false}
  const [clicked, setClicked] = useState(false);
  const [activeuser, setactiveuser] = useState(true);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const ActiveUser = () => {
    return (
      <>
        <header className="home-header flex ">
          {/*<h2>Inc. This Morning</h2>*/}
          <div className="navbar-menu p-2 w-full justify-content-start ">
            <div className="navbar-link-logo " onClick={handleClick}>
              <i
                className={clicked ? "pi  pi-times" : " pi pi-bars "}
                style={{ fontSize: "2rem" }}
              ></i>
            </div>
            <div className=" justify-content-canter">
              <ul
                className={
                  clicked
                    ? "navbar-item active w-full mt-8 p-2"
                    : "w-full navbar-item justify-content-canter"
                }
                style={{ fontSize: "2rem" }}
              >
                <a href="" className="navbar-link">
                  {" "}
                </a>
                <a href="" className="navbar-link-exp font">
                  داشبورد
                </a>
                <a href="" className="navbar-link-exp font">
                  کالکشن
                </a>
                <a href="" className="navbar-link-exp font">
 تنظیمات
                </a>
                <a href="" className="navbar-link-exp font">
                  حساب
                </a>
                {/*</ul>*/}
                {/*<ul className="navbar-item-1">*/}
                <a href="" className="navbar-link-1 font">
                  {" "}
                  خروج{" "}
                </a>
              </ul>
            </div>
            <div className="navbar-menue  w-full   justify-content-end  ">
              <a
                href=""
                className="navbar-link-2  font"
                style={{ color: "#424874" }}
              >
                {" "}
                خروج{" "}
              </a>
              <div className="navbar-logo        ">
                <img src={Logo} alt="logo" />
              </div>
            </div>
          </div>
        </header>
      </>
    );
  };

  const NoActiveUser = () => {
    return (
      <>
        <header className="home-header flex ">
          {/*<h2>Inc. This Morning</h2>*/}
          <div className="navbar-menu p-2 w-full justify-content-start ">
            <div className="navbar-link-logo " onClick={handleClick}>
              <i
                className={clicked ? "pi  pi-times" : " pi pi-bars "}
                style={{ fontSize: "2rem" }}
              ></i>
            </div>
            <div className=" justify-content-canter">
              <ul
                className={
                  clicked
                    ? "navbar-item active w-full mt-8 p-2"
                    : "w-full navbar-item justify-content-canter"
                }
                style={{ fontSize: "2rem" }}
              >
                <a href="" className="navbar-link">
                  {" "}
                </a>
                <a href="" className="navbar-link-exp font">
             خانه     
                </a>
                <a href="" className="navbar-link-exp font p-2">
  درباره                </a>
                <a href="" className="navbar-link-exp  font">
                      پشتیبانی    
                </a>
                <a href="" className="navbar-link-exp font">
                   پشتیبانی
                </a>
                {/*</ul>*/}
                {/*<ul className="navbar-item-1">*/}
                {/* <a href="" className="navbar-link-1 font">
                  {" "}
                  خروج{" "}
                </a> */}
              </ul>
            </div>
            <div className="navbar-menue  w-full   justify-content-end  ">
              {/* <a
                href=""
                className="navbar-link-2  font"
                style={{ color: "#424874" }}
              >
                {" "}
                خروج{" "}
              </a> */}
              <div className="navbar-logo        ">
                <img src={Logo} alt="logo" />
              </div>
            </div>
          </div>
        </header>
      </>
    );
  };

  return (
    <>
    {activeuser==false ?  <NoActiveUser/> :  <ActiveUser /> }
    
    </>
  );
};

export default Header;
