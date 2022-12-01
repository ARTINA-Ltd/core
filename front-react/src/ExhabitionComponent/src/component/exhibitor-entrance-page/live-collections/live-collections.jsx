import "./live-collections-styles.css";
import { images } from "../../images";
import React, { useState } from "react";

const exhibitions = [
  {
    id: 1,
    image: images["g-1.png"],
    marketName: "نمایشگاه نستعلیق",
    start_date: "۸ مهر",
  },
  {
    id: 2,
    image: images["g-2.png"],
    marketName: "نمایشگاه نستعلیق",
    start_date: "۸ مهر",
  },
  {
    id: 3,
    image: images["g-3.png"],
    marketName: "نمایشگاه نستعلیق",
    start_date: "۸ مهر",
  },
  {
    id: 4,
    image: images["g-4.png"],
    marketName: "نمایشگاه نستعلیق",
    start_date: "۸ مهر",
  },
  {
    id: 5,
    image: images["g-5.png"],
    marketName: "نمایشگاه نستعلیق",
    start_date: "۸ مهر",
  },
  {
    id: 6,
    image: images["g-6.png"],
    marketName: "نمایشگاه نستعلیق",
    start_date: "۸ مهر",
  },
  {
    id: 7,
    image: images["g-7.png"],
    marketName: "نمایشگاه نستعلیق",
    start_date: "۸ مهر",
  },
  {
    id: 8,
    image: images["g-8.png"],
    marketName: "نمایشگاه نستعلیق",
    start_date: "۸ مهر",
  },
  {
    id: 9,
    image: images["g-9.png"],
    marketName: "نمایشگاه نستعلیق",
    start_date: "۸ مهر",
  },
];

const Livecollections = ({ exhibitions }) => {
  let options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <div className="head-section">
      <div className=" section live-collections">
        <p className="title"> نمایشگاه های در حال برگزاری شما </p>
        <div className="collections-container">
          {exhibitions.map((exhibition) => (
            <div key="" className="collection">
              <img className="collection-image" src={exhibition.image} alt="" />

              <p className="collection-title name-title">
                {exhibition.marketName}
              </p>
              <p className="collection-title col-date">
                زمان برگزاری :
                {new Date(exhibition.start_date).toLocaleDateString(
                  "fa-IR",
                  options
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button className="section-1-header-button more-btn">بیشتر </button>
    </div>
  );
};

export default Livecollections;
