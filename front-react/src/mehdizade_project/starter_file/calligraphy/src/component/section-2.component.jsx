import "./section-2.component_style.css";
import section_2_5 from "../images/section-2-1.png";
import section_2_3 from "../images/section-3-5.png";
import {Link} from 'react-router-dom'
import { Fade, Slide, Zoom } from "react-slideshow-image";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Section_2 = () => {
    /* baraye edit kardan button haye slider */
    const properties = {
        prevArrow: (
            <button className="next-arrow-edition-1">
                <FaArrowLeft />
            </button>
        ),
        nextArrow: (
            <button className="next-arrow-edition-1">
                <FaArrowRight />
            </button>
        ),
    };
    return (
        <div className="section-2-main-main-container">
            <h1 className="section-2-header-text">بهترین نمایشگاه</h1>
            <Fade {...properties}>
                <div className="section-2-important-container">
                    <p1 className="section-2-name-of-festival">نمایشگاه میرعماد</p1>
                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                    <img
                        className="section-2-image"
                        src={section_2_5}
                        alt="festival-image"
                    />
                    <div className="section-2-main-detail-time-date-container">
                        <ul className="section-2-detail" dir="rtl" lang="fa">
                            <li>
                                این نمایشگاه به منظور فروش محصولات هنری به اجرا درامده است
                            </li>
                            <li>مدت زمان برگزاری : 10 الی 11 صبح </li>
                            <li>تاریخ برگزاری : 5/02/1379</li>
                        </ul>
                        <Link to={"artistPage"} className="button-footer section-2-button" >
                            مشاهده محصولات
                        </Link>
                    </div>
                </div>
                <div className="section-2-important-container">
                    <p1 className="section-2-name-of-festival">نمایشگاه میرعماد</p1>
                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                    <img
                        className="section-2-image"
                        src={section_2_3}
                        alt="festival-image"
                    />
                    <div className="section-2-main-detail-time-date-container">
                        <ul className="section-2-detail" dir="rtl" lang="fa">
                            <li>
                                این نمایشگاه به منظور فروش محصولات هنری به اجرا درامده است
                            </li>
                            <li>مدت زمان برگزاری : 10 الی 11 صبح </li>
                            <li>تاریخ برگزاری : 5/02/1379</li>
                        </ul>
                        <Link to={"artistPage"} className="button-footer section-2-button" >
                            مشاهده محصولات
                        </Link>
                    </div>
                </div>
            </Fade>
        </div>
    );
};
export default Section_2;
