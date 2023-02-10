import "./Footer.css";
import { Button } from "primereact/button";

const Footer = () => {
    return (
        <div className="footer grid col-12 w-full m-0 md:col-12 lg:col-12" >
            <div className="footer-content  h-auto ">
{/* footer right */}
                <div className="footer-right  grid col-12    md:col-4 lg:col-4">
                    <div className="footer-about flex justify-content-center w-full      grid col-6   md:col-4 lg:col-4 ">
                        <h1 className="  flex justify-content-start align-items-start       " style={{fontFamily:' Vazir-Medium, sans-serif'}}>آرتینا</h1>
                        <p className=" flex   justify-content-start   align-items-start     " style={{fontFamily:' Vazir-Medium, sans-serif'}}>
                            وبلاگ آرتینا یک پلتفرم آموزشی و<br /> خبری در زمینه هنر های دیجیتال است.
                        </p>
                    </div>
                </div>

{/* footer middle */}
                <div className="footer-middle flex justify-content-center grid col-12   md:col-4 lg:col-4 ">
                    <div className="footer-links  grid " >
                        <h3 className="  flex justify-content-center align-items-center  font  " >دسترسی سریع</h3>
                        <ul className=" flex justify-content-center   " >
                            <a href="/" className="footer-link-item  "  >
                                <li className="font">صفحه اصلی</li>
                            </a>
                            <a href="/" className="footer-link-item  ">
                                <li className="font">درباره ما</li>
                            </a>
                            <a href="/" className="footer-link-item  ">
                                <li className="footer-link-item font">تماس با ما</li>
                            </a>
                            <a href="/" className="footer-link-item">
                                <li>قوانین و مقررات</li>
                            </a>
                        </ul>
                    </div>
                </div>

                {/* footer left */}
                <div className="footer-left          ">
                    <div className="footer-subscription grid    text-right ">
                        <h3 className="  text-center lg:text-right col-12 mt-4 font"  >اشتراک در خبرنامه</h3>
                        <p className="  lg:text-right   text-center   col-12 font " >
                            از آخرین اخبار و آموزش ها با خبر شوید.
                        </p>
                        <form className="mt-4 mb-4 flex justify-content-center col-12 grid">
                            <input className="col-12" type="email" placeholder="ایمیل خود را وارد کنید"/>
                            <Button className="col-12 justify-content-center text-3xl font">ثبت</Button>
                        </form>
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
                <p style={{fontFamily:' B Nazanin'}}> تمامی حقوق مادی و معنوی متعلق به آرتینا می باشد. </p>
            </div>
        </div>
    )
}

export default Footer;