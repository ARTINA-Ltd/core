import "./section-2-component_style.css";
// import { images } from "../../images";
import React, { useState } from "react";

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
export const images = importAll(
  require.context("./../image/footer", false, /\.(png|jpe?g|svg)$/)
);

const collections = [
  {
    id: 1,
    image: images["g-1.png"],
    title: "نمایشگاه نستعلیق",
    date: "۸ مهر",
  },
  {
    id: 2,
    image: images["g-2.png"],
    title: "نمایشگاه نستعلیق",
    date: "۸ مهر",
  },
  {
    id: 3,
    image: images["g-3.png"],
    title: "نمایشگاه نستعلیق",
    date: "۸ مهر",
  },
  {
    id: 4,
    image: images["g-4.png"],
    title: "نمایشگاه نستعلیق",
    date: "۸ مهر",
  },
  {
    id: 5,
    image: images["g-5.png"],
    title: "نمایشگاه نستعلیق",
    date: "۸ مهر",
  },
  {
    id: 6,
    image: images["g-6.png"],
    title: "نمایشگاه نستعلیق",
    date: "۸ مهر",
  },
  {
    id: 7,
    image: images["g-7.png"],
    title: "نمایشگاه نستعلیق",
    date: "۸ مهر",
  },
  {
    id: 8,
    image: images["g-8.png"],
    title: "نمایشگاه نستعلیق",
    date: "۸ مهر",
  },
  {
    id: 9,
    image: images["g-9.png"],
    title: "نمایشگاه نستعلیق",
    date: "۸ مهر",
  },
];

const Section_2 = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div className=" section live-collections">
      <h2> نمایشگاه های در حال برگزاری شما </h2>
      <div className="collections-container">
        {collections.map((collection) => (
          <div key={collection.id} className="collection">
            <img className="collection-image" src={collection.image} alt="" />

            <p className="collection-title name-title">{collection.title}</p>
            <p className="collection-title col-date">
              زمان برگزاری :{collection.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section_2;
