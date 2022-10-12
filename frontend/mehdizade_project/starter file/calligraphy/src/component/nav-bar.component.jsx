import "./nav-bar.component_style.css";

import React, { useState } from "react";
// import Request_pages from "../request list for exhibition /requests/paging";

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
export const images = importAll(
  require.context("./../images/footer", false, /\.(png|jpe?g|svg)$/)
);

const menu = ["خانه ", "در باره ما", "پروفایل من"];

const Nav_bar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
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
          {menu.map(
            (item) =>
              // <a onClick={<Request_pages />} className="menu-item">
              ({ item })
            // </a>
          )}
        </div>
        <div className="inner-addon">
          <input type="text" />
          <i class="icon-bar"></i>
        </div>
      </div>
    </div>
  );
};

export default Nav_bar;
