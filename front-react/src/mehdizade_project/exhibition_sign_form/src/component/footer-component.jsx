import "./footer-component_style.css";
// import { images } from "../images/footer";
import { IconName } from "react-icons/fa";

import { Link } from "react-router-dom";
import Logo from "../../../starter_file/calligraphy/src/images/footer/logo.png"
function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
export const images = importAll(
  require.context("", false, /\.(png|jpe?g|svg)$/)
);

const link_content = [
  {
    title: "پروفایل من",
    link_1: "نویسنده ها",
    link_2: "کالکشن ها",
    link_3: "ایجاد یک آیتم",
    link_4: "پروفایل نویسنده",
  },
  {
    title: "منابع",
    link_1: "راهنما ",
    link_2: "جزییات موارد",
    link_3: "فعالیت ها",
    link_4: "حراج ها",
  },
  {
    title: "شرکت",
    link_1: "کاوش کردن",
    link_2: "ارتباط با ما",
    link_3: "بلاگ ما",
    link_4: "سوالات",
  },
];



const Footer = () => {
  return (
    <>
      <div className="content" dir="ltr" >
        {/* <footer dir="rtl">
          <div className="footer-content-wrapper">
            <div className="footer-col large-25 small-50 tiny-100  flt">
              <div className="row socialmedia flex justify-content-center align-items-center mt-20 " dir="ltr">
                <img className="sm-icon" src={SocialMedia1} />
                <img className="sm-icon" src={SocialMedia2} />
                <img className="sm-icon" src={SocialMedia3} />
                <img className="sm-icon" src={SocialMedia5} />
              </div>
            </div>

            <div className="section footer-col large-25 small-50 tiny-100  flt">
              <p className="link-title">دسته بندی ها</p>
              <Link to={"/artistpage"} className="links"><p className="desc">ارتباط با ما</p></Link>
              <Link to={"/artistpage"} className="links"><p className="desc">سوالات</p></Link>
              <Link to={"/artistpage"} className="links"><p className="desc">درباره آرتینا</p></Link>
            </div>
            <div className="footer-col large-25 small-50 tiny-100  flt">
              <div className="footer-section">
                {/* <div className="footer-conent">
               <div className="footer-about"> */}
        {/* <div className="about-us">
           
                </div>
                <p className="desc1">راهی تازه به دنیای هنر </p>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
          

        </footer> */}
        
        <footer className="footer">
          <div className="footer-left col-md-4 col-sm-6">
            <div className="icons">
              <Link to={"/"}><i className="fa fa-twitter"></i></Link>
              <Link to={"/"}><i className="fa fa-linkedin"></i></Link>
              <Link to={"/"}><i className="fa fa-google-plus"></i></Link>
              <Link to={"/"}><i className="fa fa-instagram"></i></Link>
            </div>
          </div>
          <div className="footer-center col-md-4 col-sm-6">
            <div className="title">
              <p className="link-title">دسته بندی ها</p>
            </div>
            <div className="title1">
              <ul className="">
                <li>
            <Link to={"/artistpage"} className="links"><p className="desc">ارتباط با ما</p></Link>
            </li>
            <li>
              <Link to={"/artistpage"} className="links"><p className="desc">سوالات</p></Link>
              </li>
              <li>
              <Link to={"/artistpage"} className="links"><p className="desc">درباره آرتینا</p></Link>
              </li>
              </ul>
            </div>
          </div>
          
          <div className="footer-right  col-md-4 col-sm-6  ">
            <div className="about-us ">
            <img className="logo" src={Logo} alt="" />
              <p className="footer-title">آرتینا</p>
            </div>
            <p className="desc1">راهی تازه به دنیای هنر </p>

          </div>
        </footer>
        <div className="copyright">
          <p className="copyright1"> Copyright @ 2022 by Artina-All rights reserved</p>

          </div>
      </div>
    </>

  );
};
export default Footer;
