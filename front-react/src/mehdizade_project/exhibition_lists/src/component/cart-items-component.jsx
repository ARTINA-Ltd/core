import "./cart-item-component_style.css";
import React, { useState, useEffect } from "react";

import test from "./../images/1.png";

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
export const images = importAll(
  require.context("./../images", false, /\.(png|jpe?g|svg)$/)
);

const collection = [
  {
    image: images["1.png"],
    creator: "ابولفضل پورغرب",
    title: "نمایشگاه میرعماد",
    start_date: "21/12/1378",
    end_date: "5/2/1379",
    time: " ساعت 17 الی 15 عصر",
  },
  {
    image: images["section-1-2.png"],
    creator: "ابولفضل حیدری نیا",
    title: "نمایشگاه مالکی",
    start_date: "21/12/1378",
    end_date: "5/2/1379",
    time: " ساعت 19 الی 15 عصر",
  },
  {
    image: images["section-5-2.jpg"],
    creator: "محمد رضا امینی",
    title: "نمایشگاه محمدی",
    start_date: "21/12/1378",
    end_date: "5/2/1379",
    time: " ساعت 19 الی 15 عصر",
  },
];
const Section_1 = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequest = async () => {
      const res = await fetch("http://127.0.0.1:8000/exhibition/exhibitions/");
      const requests = await res.json();
      setRequests(requests);
    };

    fetchRequest();
  }, []);
  return (
    <div className="the-main">
      {collection.map((items) => {
        return (
          <div className="main-container">
            <div className="detail-and-image-container">
              <img
                className="section-1-main-image"
                src={test}
                // src={
                //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKICBdaBsTtMtCLFNkvE9cndT2x14TnXImHA&usqp=CAU"
                // }
                alt="photo"
              />
              <div className="detail-container">
                <p1 className="secion-1-header-main">{items.marketName}</p1>
                <p1>برگزار کننده:{items.user}</p1>
                {/* <p1>{items.end_date}: زمان برگزاری</p1> */}
                <p1>
                  {new Date(items.start_date).toLocaleDateString("fa-IR")}:تاریخ
                  شروع نمایشگاه
                </p1>
                <p1>
                  {" "}
                  {new Date(items.end_date).toLocaleDateString("fa-IR")}:تاریخ
                  اتمام نمایشگاه
                </p1>
                {/* <p1>{items.end_date}:تاریخ اتمام نمایشگاه</p1> */}
              </div>
            </div>
            <button className="button-section-1">بررسی کن</button>
          </div>
        );
      })}
    </div>
  );
};
export default Section_1;
