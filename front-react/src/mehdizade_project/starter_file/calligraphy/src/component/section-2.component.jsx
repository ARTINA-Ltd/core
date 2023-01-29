import "./section-2.component_style.css";
import section_2_5 from "../images/section-2-1.png";
import section_2_3 from "../images/section-3-5.png";
import {Link} from 'react-router-dom'
import {Fade, Slide, Zoom} from "react-slideshow-image";
import {useEffect, useState} from "react"
import axios from "axios";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

const Section_2 = () => {
    const [exhibitions, setExhibitions] = useState([""]);
    const [exhibitions2, setExhibitions2] = useState([""]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const Number = Math.floor(Math.random() * 3);

    const Baseurl = `http://78.38.35.249:8000/api/exhibition/exhibitions/${Number}/`
    const Length = Baseurl.length;
    useEffect(() => {
        const fetchExhibitions = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    Baseurl
                );
                setExhibitions(res.data);
                setError(null);
            } catch (err) {
                setError(err.message);
                setExhibitions(null);
            }
        }
        fetchExhibitions();
    }, []);

    const Number2 = Math.floor(Math.random() * 3);

    useEffect(() => {
        const fetchExhibitions = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `http://78.38.35.249:8000/api/exhibition/exhibitions/${Number2}/`);
                setExhibitions2(res.data);
                setError(null);
            } catch (err) {
                setError(err.message);
                setExhibitions(null);
            }
        }
        fetchExhibitions();
    }, []);
    let array = [];
    array.push(exhibitions);
    let array2 = [];
    array2.push(exhibitions2);

    console.log(exhibitions)

    /* baraye edit kardan button haye slider */
    const properties = {
        prevArrow: (
            <button className="next-arrow-edition-1">
                <FaArrowLeft/>
            </button>
        ),
        nextArrow: (
            <button className="next-arrow-edition-1">
                <FaArrowRight/>
            </button>
        ),
    };
    return (
        <div className="section-2-main-main-container">
            <p className="section-2-header-text">بهترین نمایشگاه</p>
            <Fade {...properties}>
                <div className="section-2-important-container">
                    {array.map((exhibition) => (
                        <img
                            className="section-2-image"
                            src={exhibition.image}
                        />
                    ))}
                    {array.map((exhibition) => (
                        <p className="section-2-name-of-festival">{exhibition.marketName}</p>

                    ))}
                    <div className="section-2-main-detail-time-date-container">
                        <ul className="section-2-detail" dir="rtl" lang="fa">
                            <li>
                                این نمایشگاه به منظور فروش محصولات هنری به اجرا درامده است
                                <p>{exhibitions.description}</p>
                            </li>
                            <li>مدت زمان برگزاری : 10 الی 11 صبح</li>
                            <li>تاریخ برگزاری : 1379/02/05</li>
                        </ul>
                        <Link to={"/homepage"} className="button-footer section-2-button">
                            مشاهده محصولات
                        </Link>
                    </div>
                </div>
                <div className="section-2-important-container">
                    {array2.map((exhibition) => (
                        <img
                            className="section-2-image"
                            src={exhibition.image}
                        />
                    ))}
                    {array2.map((exhibition) => (
                        <p className="section-2-name-of-festival">{exhibition.marketName}</p>

                    ))}
                    <div className="section-2-main-detail-time-date-container">
                        <ul className="section-2-detail" dir="rtl" lang="fa">
                            <li>
                                این نمایشگاه به منظور فروش محصولات هنری به اجرا درامده است
                            </li>
                            <li>مدت زمان برگزاری : 10 الی 11 صبح</li>
                            <li>تاریخ برگزاری : 1379/05/02</li>
                        </ul>
                        <Link to={"/homepage"} className="button-footer section-2-button">
                            مشاهده محصولات
                        </Link>
                    </div>
                </div>
            </Fade>
        </div>
    );
};
export default Section_2;
