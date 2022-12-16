import "./section-3-component_style.css";
import first from "../image/section-3-1.jpg";
import second from "../image/section-3-2.png";
import third from "../image/section-3-3.png";
import moment from "moment";

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
export const images = importAll(
  require.context("./../image", false, /\.(png|jpe?g|svg)$/)
);

// const current_date = new Date();
const collection = [
  {
    image: images["section-3-3.png"],
    creator: "ابولفضل پورغرب",
    title: "نمایشگاه میرعماد",
    start_date: "2020-09-06T04:10:00.039727Z",
    end_date: "2021-09-06T04:10:00.039727Z",
    time: " ساعت 17 الی 15 عصر",
  },
  {
    image: images["section-3-2.png"],
    creator: "محمد حق زاد",
    title: "نمایشگاه حنیفی",
    start_date: "2020-01-06T04:10:00.039727Z",
    end_date: "2020-09-06T04:10:00.039727Z",
    time: " ساعت 17 الی 15 عصر",
  },
  {
    image: images["section-3-1.jpg"],
    creator: "کریم خزایی",
    title: "نمایشگاه خزایی",
    start_date: "2020-01-06T04:10:00.039727Z",
    end_date: "2020-09-06T04:10:00.039727Z",
    time: " ساعت 17 الی 15 عصر",
  },
];

const Section_3 = () => {
  return (
    <div>
      <h1 className="section-3-main-container-header">
نمایشگاه های برگزار شده شما
      </h1>
<div className="container">
      <div className="section-3-main-container">
        {collection.map((items) => {
          var end_date_moment = moment(items.end_date)._d;

          if (moment().isAfter(end_date_moment)) {
            return (
              <div className="section-3-cart-1-image">
                <img src={items.image} className="inner-image-container flex justify-content-center"></img>
                <h1 className="section-3-cart-1-main-title">{items.creator}</h1>
                <p1 className="section-3-cart-1-time-calendar">{items.time}</p1>
                <p1 className="section-3-cart-1-calendar">
                  تاریخ برگزار شده :
                  {new Date(items.start_date).toLocaleDateString("fa-IR")}
                  الی {new Date(items.end_date).toLocaleDateString("fa-IR")}
                </p1>
              </div>
            );
          }
        })}
      </div>
    </div>
    </div>
  );
};
export default Section_3;
