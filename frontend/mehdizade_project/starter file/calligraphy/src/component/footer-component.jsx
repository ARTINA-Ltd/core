import "./footer-component_style.css";
// import { images } from "../images/footer";

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

const social_media = [
  images["social-media5.png"],
  images["social-media2.png"],
  images["social-media1.png"],
  images["social-media4.png"],
];

const Footer = () => {
  return (
    <div>
      <div className="footer-section">
        <div className="footer-conent">
          <div className="footer-about">
            <div className="about-us">
              <img className="logo" src={images["logo.png"]} alt="" />
              <h3 className="footer-title">وبسایت</h3>
            </div>
            <p className="desc">
              این یک متن درباره توضیحانی راجع به سایت می باشد. این یک متن درباره
              توضیحانی راجع به سایت می باشد.
            </p>
          </div>

          <div className="footer-links">
            {link_content.map((links) => (
              <div className="links-box">
                <p className="link-title">{links.title}</p>
                {Object.keys(links).map((link, i) => (
                  <div classname="sublinks">
                    {(() => {
                      if (links[link] != links.title) {
                        return (
                          <p className="links" key={i}>
                            {links[link]}
                          </p>
                        );
                      }
                    })()}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className=" footer-contact">
            <h3 className="footer-titles subscribe">سابسکرایب کنید</h3>
            <div className="email">
              <input classname="email-box" type="text" />
              <button className="submit-btn">
                <img className="submit_icon" src={images["submit.png"]} />
              </button>
            </div>
            <div className="social-media">
              {social_media.map((icon) => (
                <img className="sm-icon" src={icon} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="copyright"></div>
    </div>
  );
};
export default Footer;
