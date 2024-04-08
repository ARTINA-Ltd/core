import "./footer-component_style.css";

// import { images } from "../images/footer";

// function importAll(r) {
//   let images = {};
//   r.keys().forEach((item, index) => {
//     images[item.replace("./", "")] = r(item);
//   });
//   return images;
// }
// export const images = importAll(
//   require.context("./../images/footer", false, /\.(png|jpe?g|svg)$/)
// );
const link_content = [
  {
    link_1: "نویسنده ها",
    link_2: "کالکشن ها",
    link_3: "ایجاد یک آیتم",
  },

  {
    link_2: "ارتباط با ما",
    link_4: "سوالات",
  },
];

// const social_media = [
//   images["social-media5.png"],
//   images["social-media2.png"],
//   images["social-media1.png"],
//   images["social-media4.png"],
// ];

const Footer = () => {
  return (
    <div className="footer">
      {/* <div className="footer-section">
        <div className="footer-conent">
          <div className="footer-about">
            <div className="about-us">
              <img className="logo" src={Logo} alt="" />
              <p className="footer-title">آرتینا</p>
            </div>
            <p className="desc1">
راهی تازه به دنیای هنر            </p>
          </div>

          <div className="footer-links">
              <div className="links-box">
                  <div classname="sublinks ">
                    <div className="row">
                    <div className="col">
                    <p className="link-title">دسته بندی ها </p>
                  <Link to={"/artistpage"} className="links"><p className="desc">نویسنده</p></Link>
                  <Link to={"/artistpage"} className="links"><p className="desc">کالکشن ها</p></Link>
                  <Link to={"/artistpage"} className="links"><p className="desc">ایجاد یک آیتم</p></Link>

                  </div>
                  <div className="col links1">
                  <Link to={"/artistpage"} className="links"><p className="desc">ارتباط با ما</p></Link>
                  <Link to={"/artistpage"} className="links"><p className="desc">سوالات</p></Link>
                  <Link to={"/artistpage"} className="links"><p className="desc">درباره آرتینا</p></Link>

                  </div>
                  </div>
                  </div>
              </div>
          </div>

          <div className=" footer-contact">
            <div className="social-media">
              <div className="row social-media1">
                <img className="sm-icon" src={SocialMedia1} />
                <img className="sm-icon" src={SocialMedia2} />
                </div>
                <div className="row social-media2">
                <img className="sm-icon" src={SocialMedia3} />
                <img className="sm-icon" src={SocialMedia5} />
                </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="copyright">
        Copyright @ 2020 by Artina-All rights reserved
      </div>
    </div>
  );
};
export default Footer;
