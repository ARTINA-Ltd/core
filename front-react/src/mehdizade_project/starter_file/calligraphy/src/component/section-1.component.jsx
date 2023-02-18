import section_3_5 from "../images/section-1-1.png";
import section_3_4 from "../images/section-2-1.png";
import "./section-1.component_style.css";
import "react-slideshow-image/dist/styles.css";
import { Zoom } from "react-slideshow-image";
import { Link, Outlet } from "react-router-dom";
const Section_1 = ({ cart_info }) => {
  const zoomOutProperties = {
    duration: 5000,
    transitionDuration: 1000,
    infinite: true,
    indicators: true,
    // scale: 0.4,
    arrows: false,
    margin: "20px",
  };
  return (
    <div>
      <Zoom {...zoomOutProperties}>
        <div
          className="image-section-1"
          style={{ backgroundImage: `url(${section_3_5})` }}
        >
          {/* <img
          className="image-section-1"
          src={section_3_5}
          alt="namayeshgah-1"
        /> */}
          <div className="text-section-1-container">
            <h1 className="section-1-text-header font">نمایشگاه میرزا</h1>
            <ul className="section-1-text-details font" dir="rtl" lang="fa">
              <li className="font text-6xl mt-2">
                قدیمی ترین و مطمئن ترین اثاری که میتوان پیدا کرد
              </li>
              <li className="font text-5xl mt-5">ساعت برگزاری 10 الی 11</li>
              <li className="font text-4xl mt-5"> 5/2/1401 </li>
            </ul>
            <Link
              to="/artistpage"
              className="button-footer section-1-button font"
              style={{ backgroundColor: "#DCD6F7", color: "#424874" }}
            >
              ثبت آثار
            </Link>
          </div>
        </div>
        <div
          className="image-section-1"
          style={{ backgroundImage: `url(${section_3_4})` }}
        >
          {/* <img
          className="image-section-1"
          src={section_3_5}
          alt="namayeshgah-1"
        /> */}
          <div className="text-section-1-container ">
            <h1
              className="section-1-text-header font bg-gray-800
"
            >
              نمایشگاه ملک محمدی
            </h1>
            <ul
              className="section-1-text-details bg-gray-800
"
              dir="rtl"
              lang="fa"
            >
              <li className="font text-5xl mt-5">
                آثار خود را به راحتی بفروشید مدت زمان
              </li>
              <li className="font text-5xl mt-5">ساعت برگزاری 5 الی 21</li>
              <li className="font text-5xl mt-5">8/7/1399 مورخ </li>
            </ul>
            <Link
              to="/artistpage"
              className="button-footer section-1-button font"
              style={{ backgroundColor: "#DCD6F7", color: "#424874" }}
            >
              ثبت آثار
            </Link>
          </div>
        </div>
      </Zoom>
      <Outlet />
    </div>
  );
};
export default Section_1;
