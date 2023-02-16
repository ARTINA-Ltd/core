import "./Footer.css";
import { Button } from "primereact/button";

const Footer = () => {
  return (
    <div className="footer grid  col-12 w-full m-0 mt-8 mb-0 md:col-12 lg:col-12">
      <div className="footer-content  h-auto ">
        
        <div className="footer-right  grid col-12 mb-7   md:col-4 lg:col-4">
          <div className="footer-about flex justify-content-center w-full      grid col-6   md:col-4 lg:col-4 ">
            <h1
              className="  flex justify-content-start align-items-start       "
              style={{ fontFamily: " Vazir-Medium, sans-serif" }}
            >
              آرتینا
            </h1>
            <p
              className=" flex   justify-content-start   align-items-start     "
              style={{ fontFamily: " Vazir-Medium, sans-serif" }}
            >
              وبلاگ آرتینا یک پلتفرم آموزشی و  خبری در زمینه هنر های
              دیجیتال است.
            </p>
          </div>
        </div>

        {/* footer middle */}
        <div className="footer-middle flex justify-content-center grid col-12 mt-0  md:col-4 lg:col-4 ">
          <div className="footer-links  grid mb-4 ">
            <h3 className="  flex justify-content-center align-items-center text-4xl font  ">
              دسترسی سریع
            </h3>
            <ul className=" flex justify-content-center   ">
              <a href="/" className="footer-link-item  ">
                <li className="font">صفحه اصلی</li>
              </a>
              <a href="/" className="footer-link-item  ">
                <li className="font">درباره ما</li>
              </a>
              <a href="/" className="footer-link-item  ">
                <li className="footer-link-item font">تماس با ما</li>
              </a>
              <a href="/" className="footer-link-item ">
                <li className="footer-link-item font">قوانین و مقررات</li>
              </a>
            </ul>
          </div>
        </div>

        {/* footer left */}
        <div className="footer-left          ">
          <div className="footer-subscription grid    text-right ">
<div className="   text-center lg:text-center col-12 mt-4  ">
<h3 className="  text-4xl  font">
              اشتراک در خبرنامه
            </h3>
</div>

           
<div className="   text-center lg:text-center col-12 mt-0  ">
<p className="   font ">
              از آخرین اخبار و آموزش ها با خبر شوید.
            </p>
</div>

           



            <div className=" align-items-center justify-content-center flex col-12 grid mt-0 mb-4">
            <form className=" w-8   ">
              <input
                className="col-12 text-4xl"
                type="email"
                placeholder="ایمیل خود را وارد کنید"
              />
              <Button className="col-12 h-4rem justify-content-center text-4xl font">
                ثبت
              </Button>
            </form>
            </div>
           
          </div>
          {/* <div className="footer-social   ">
                        <h3>شبکه های اجتماعی</h3>
                        <div className="footer-social-icons">
                            <a href="https://twitter.com/">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://www.instagram.com/">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://www.telegram.com/">
                                <i className="fab fa-telegram"></i>
                            </a>
                            <a href="https://www.whatsapp.com/">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div> */}
        </div>
      </div>
      <div className="footer-copyright">
        {/*<p>.Copyright© 2023 by Artina Ltd</p>*/}
        {/* style={{ fontFamily: " B Nazanin" }} */}
        <p className="font" >
          {" "}
            تمامی حقوق مادی و معنوی متعلق به آرتینا می باشد.{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
