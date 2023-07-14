import React from "react";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const MainSlider = () => {
  require("./MainSlider.css");


  return (
    <>
      <div
        className="w-full h-[968px] keen-slider lg:h-[550px] md:h-[400px]"
      >
        <Swiper navigation={true} modules={[Navigation]} slidesPerView={1} spaceBetween={0}>
          <SwiperSlide>
              <img src="/1.jpg" className="object-cover w-full" alt="" />
          </SwiperSlide>
          <SwiperSlide>
              <img src="/2.jpg" className="object-cover w-full" alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      
    </>
  );
};

export default MainSlider;
