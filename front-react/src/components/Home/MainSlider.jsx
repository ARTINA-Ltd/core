import React, { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const MainSlider = () => {
  require("./styles.css");

  return (
    <Fragment>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide className="min-w-full min-h-full">
          <img src="/2 - Copy.jpg" className="object-cover w-full h-full  overflow-visible" alt="" />
        </SwiperSlide>
        <SwiperSlide className="min-w-full min-h-full">
          <img src="/4.jpg" className="object-cover w-full min-h-full overflow-visible" alt="" />
        </SwiperSlide>
      </Swiper>
    </Fragment>
  );
};

export default MainSlider;
