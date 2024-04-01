import React from "react";
import Slider from "react-slick";

function SimpleSlider(props) {
  const { list } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {list.map((item, i) => {
          return (
            <div key={i}>
              <img src={item.image_url} alt={item.name} />
              <p>{item.description}</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
