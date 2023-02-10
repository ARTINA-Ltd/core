import React, { useState } from "react";
import "./Header.css";
import Logo from "../../Pages/artina-logo.jpg";
import { Avatar } from "primereact/avatar";

const Header = () => {
  // const state = {clicked: false}
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <header className="home-header  ">
      {/*<h2>Inc. This Morning</h2>*/}
      <div className="navbar-menu">
        <div className="navbar-link-logo " onClick={handleClick}>
          <i
            className={clicked ? "pi  pi-times" : " pi pi-bars "}
            style={{ fontSize: "2rem" }}
          ></i>
        </div>
        <ul
          className={clicked ? "navbar-item active  mt-8 p-2" : "navbar-item"}
          style={{ fontSize: "2rem" }}
        >
          <a href="" className="navbar-link">
            {" "}
            <Avatar label="P" size="xlarge" shape="circle" />
          </a>
          <a href="" className="navbar-link font">
            {" "}
            لینک اول{" "}
          </a>
          <a href="" className="navbar-link-exp font">
            {" "}
            لینک دوم{" "}
          </a>
          {/*</ul>*/}
          {/*<ul className="navbar-item-1">*/}
          <a href="" className="navbar-link-1 font">
            {" "}
            خروج{" "}
          </a>
        </ul>
        <img src={Logo} alt="logo" className="navbar-logo m-2 p-2" />
      </div>
      <h1 className="font">
        <span></span>وبلاگ آرتینا<span></span>
      </h1>
      <p className="font">
        راهی تازه به دنیای هنر <br /> از تاره ترین اخبار و آموزش های دنیای NFT
        ها باخبر شوید.
      </p>
    </header>
  );
};

export default Header;
