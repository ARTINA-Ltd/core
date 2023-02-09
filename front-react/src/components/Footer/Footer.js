import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer grid col-12   md:col-12 lg:col-12">
            <div className="footer-content  h-auto ">
{/* footer right */}
                <div className="footer-right  grid col-12    md:col-4 lg:col-4">
                    <div className="footer-about flex justify-content-center w-full      grid col-6   md:col-4 lg:col-4 ">
                        <h1 className="  flex justify-content-center align-items-center       ">آرتینا</h1>
                        <p className=" flex   justify-content-center   align-items-center     ">
                            وبلاگ آرتینا یک پلتفرم آموزشی و<br /> خبری در زمینه هنر های دیجیتال است.
                        </p>
                    </div>
                </div>

{/* footer middle */}
                <div className="footer-middle flex justify-content-center grid col-6   md:col-4 lg:col-4 ">
                    <div className="footer-links  grid ">
                        <h3 className="col-12  flex justify-content-center align-items-center  md:col-12 lg:col-12 ">دسترسی سریع</h3>
                        <ul className="col-12 flex justify-content-center  md:col-12 lg:col-12 ">
                            <a href="/" className="footer-link-item">
                                <li>صفحه اصلی</li>
                            </a>
                            <a href="/" className="footer-link-item">
                                <li>درباره ما</li>
                            </a>
                            <a href="/" className="footer-link-item">
                                <li className="footer-link-item">تماس با ما</li>
                            </a>
                            <a href="/" className="footer-link-item">
                                <li>قوانین و مقررات</li>
                            </a>
                        </ul>
                    </div>
                </div>

                {/* footer left */}
                <div className="footer-left grid col-12   md:col-12 lg:col-12 ">
                    <div className="footer-subscription ">
                        <h3 className=" flex justify-content-start  md:col-12 lg:col-12 ">اشتراک در خبرنامه</h3>
                        <p >
                            از آخرین اخبار و آموزش ها با خبر شوید.
                        </p>
                        <form className=" flex justify-content-center">
                            <input className="" type="email" placeholder="ایمیل خود را وارد کنید"/>
                            <button>ثبت</button>
                        </form>
                    </div>
                    <div className="footer-social   ">
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
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                {/*<p>.Copyright© 2023 by Artina Ltd</p>*/}
                <p> تمامی حقوق مادی و معنوی متعلق به آرتینا می باشد. </p>
            </div>
        </div>
    )
}

export default Footer;