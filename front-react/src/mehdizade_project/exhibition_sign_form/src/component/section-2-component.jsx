import "./section-2-component_style.css";
import Section_5_image from "../images/1.png";
import Section_5_image_2 from "../images/section-5-2.jpg";
import Section_5_image_3 from "../images/section-5-3.jpg";
import Section_5_image_4 from "../images/section-5-4.jpg";
import Section_5_image_5 from "../images/section-5-5.jpg";
import Section_5_image_6 from "../images/section-5-6.jpg";
const Section_2 = () => {
    return (
        <div className="main">
            <h1 className="section5-header flex justify-center">توضیحات نمایشگاه</h1>
            <div className="section5-container">
                <div className="image-main-container">
                    <img
                        src={Section_5_image}
                        className="image-container5 image-container5-1"
                    ></img>
                    <img
                        src={Section_5_image_2}
                        className="image-container5 image-container5-2"
                    ></img>
                    <img
                        src={Section_5_image_3}
                        className="image-container5 image-container5-3"
                    ></img>
                    <img
                        src={Section_5_image_4}
                        className="image-container5 image-container5-4"
                    ></img>
                    <img
                        src={Section_5_image_5}
                        className="image-container5 image-container5-5"
                    ></img>
                    <img
                        src={Section_5_image_6}
                        className="image-container5 image-container5-6"
                    ></img>
                </div>

                <div className="section5-text" dir="rtl" lang="fa">
                    <p className="section5-text-inside-border">
                        در این نوشتار، نگارنده تلاش کرده حالات و احوال معنوی و خوشایندی را
                        که از لحظات نگارش بر او گذشته است، به رشته کلام درآورد. صرف‌نظر از
                        درون‌مایه و میزان غنا و قوت موضوع، تثبیت کردن چنین حالاتی مفید و در
                        نوع خود بدیع است. به همین سان شریک کردن دبیران هنر انگیزه‌ای است که
                        آنان نیز احساس صاف و صمیمانه خود را از این تجربه‌ها بیان و ثبت کنند.
                    </p>
                    {/* <a className="button-footer  section-5-button" href="#">
                        تجربه کن
                    </a> */}
                </div>
            </div>
        </div>
    );
};
export default Section_2;
