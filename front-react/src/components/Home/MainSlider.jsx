import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const MainSlider = () => {
  require("./MainSlider.css");

  return (
    <div>
      <div className="w-full">
        <Swiper
          navigation={true}
          loop={true}
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={0}
        >
          <SwiperSlide>
            <img src="/2 - Copy.jpg" className="object-cover w-full" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/4.jpg" className="object-cover w-full" alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default MainSlider;
